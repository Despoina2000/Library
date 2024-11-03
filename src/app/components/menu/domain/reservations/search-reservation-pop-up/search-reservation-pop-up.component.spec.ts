import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReservationPopUpComponent } from './search-reservation-pop-up.component';

describe('SearchReservationPopUpComponent', () => {
  let component: SearchReservationPopUpComponent;
  let fixture: ComponentFixture<SearchReservationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReservationPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReservationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
