import { NgModule } from '@angular/core';
import { AngularFilterDropdownComponent } from './angular-filter-dropdown.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FilterIconSvgComponent } from './components/filter-icon-svg/filter-icon-svg.component';

@NgModule({
  declarations: [
    AngularFilterDropdownComponent,
    FilterIconSvgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    AngularFilterDropdownComponent
  ]
})
export class AngularFilterDropdownModule { }
