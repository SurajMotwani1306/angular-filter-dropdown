import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-angular-filter-dropdown',
  templateUrl: './angular-filter-dropdown.component.html',
  styleUrl: './angular-filter-dropdown.component.css'
})
export class AngularFilterDropdownComponent {

  @Input() tableData: any;
  @Input() columnName: any;
  @Output() onCheckBoxStatusChanged = new EventEmitter<{ id: number, checked: boolean }>();
  @Output() onUnselectAll = new EventEmitter<Boolean>();

  dropdownOpen = false;
  items: any;
  selectAll: boolean = false;
  uncheckAllStatus: boolean = false;
  dropdown: any;
  svgContent: string = `<svg width="20" height="12" viewBox="0 0 191 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.9017 93H5.90173" stroke="black" stroke-width="10" stroke-linecap="round" />
        <circle cx="60.8036" cy="93" r="20" transform="rotate(-180 60.8036 93)" stroke="black" stroke-width="10" />
        <path d="M185.908 93L85.9082 93" stroke="black" stroke-width="10" stroke-linecap="round" />
        <path d="M155.902 25H185.902" stroke="black" stroke-width="10" stroke-linecap="round" />
        <circle cx="131" cy="25" r="20" stroke="black" stroke-width="10" />
        <path d="M5.89532 25H105.895" stroke="black" stroke-width="10" stroke-linecap="round" />
    </svg>`;

  constructor(){}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;    
    if (!target.nextElementSibling?.classList.contains('show')) {
      this.dropdownOpen = false;
    }
  }

  ngOnInit(){
   this.items = this.tableData;
   this.iterateForAddingCheckedField();
   this.iterateForSelectAllChecked();
   this.iterateForSelectAllUnChecked();
  }

  iterateForAddingCheckedField(){    
    let result = this.items.map((item:any) => item[this.columnName])
    result = [...new Set(result)];
    
    let output: any[] = [];
    result.forEach((element:any) => {
      output.push({
          [`${this.columnName}`]: element,
          checked: true
        });
    });

    this.items = output;
  }

  iterateForSelectAllChecked(){
    this.selectAll = Object.values(this.items).every((item:any) => item.checked === true)
  }

  iterateForSelectAllUnChecked(){
    this.uncheckAllStatus = Object.values(this.items).every((item:any) => item.checked === false)
    if(this.uncheckAllStatus === true){
      this.onUnselectAll.emit(true);
    }else{
      this.onUnselectAll.emit(false);
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    
    this.items.forEach((item:any) => {
      item.checked = checkbox.checked;
      this.onUnselectAll.emit(item.checked);
    });

    this.iterateForSelectAllChecked();
    this.iterateForSelectAllUnChecked();
  }

  onItemSelected(item: any): void {
    this.onCheckBoxStatusChanged.emit(item);
    this.iterateForSelectAllChecked();
    // this.iterateForSelectAllUnChecked();
  }
}
