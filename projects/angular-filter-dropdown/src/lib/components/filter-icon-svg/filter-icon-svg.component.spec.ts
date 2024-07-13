import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIconSvgComponent } from './filter-icon-svg.component';

describe('FilterIconSvgComponent', () => {
  let component: FilterIconSvgComponent;
  let fixture: ComponentFixture<FilterIconSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterIconSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterIconSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
