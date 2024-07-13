import { Component, EventEmitter, ElementRef, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FilterIconSvgComponent } from './components/filter-icon-svg/filter-icon-svg.component';

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
  @ViewChild(FilterIconSvgComponent) svgIcon!: FilterIconSvgComponent;

  dropdownOpen = false;
  items: any;
  selectAll: boolean = false;
  uncheckAllStatus: boolean = false;
  dropdown: any;

  constructor(private el: ElementRef){}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isClickInsideSvg(event) && document.getElementById("dropdown-box")?.classList.contains('show')) {
      this.dropdownOpen = false;
    }
  }

  ngOnInit(){
   this.items = this.tableData;
   this.iterateForAddingCheckedField();
   this.iterateForSelectAllChecked();
   this.iterateForSelectAllUnChecked();
  }

  isClickInsideSvg(event: MouseEvent): boolean {
    const svgElement = this.el.nativeElement.querySelector('lib-filter-icon-svg svg');
    return svgElement && svgElement.contains(event.target as Node);
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
