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
