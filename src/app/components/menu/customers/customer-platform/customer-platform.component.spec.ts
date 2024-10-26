import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPlatformComponent } from './customer-platform.component';

describe('CustomerPlatformComponent', () => {
  let component: CustomerPlatformComponent;
  let fixture: ComponentFixture<CustomerPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
