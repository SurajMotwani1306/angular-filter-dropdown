import { NgModule } from '@angular/core';
import { AngularFilterDropdownComponent } from './angular-filter-dropdown.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AngularFilterDropdownComponent
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
