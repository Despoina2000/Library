import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPlatformComponent } from './reservation-platform.component';

describe('ReservationPlatformComponent', () => {
  let component: ReservationPlatformComponent;
  let fixture: ComponentFixture<ReservationPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
