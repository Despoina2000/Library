import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerPopUpComponent } from './search-customer-pop-up.component';

describe('SearchCustomerPopUpComponent', () => {
  let component: SearchCustomerPopUpComponent;
  let fixture: ComponentFixture<SearchCustomerPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCustomerPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCustomerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
