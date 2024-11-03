import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPlatformComponent } from './book-platform.component';

describe('BookPlatformComponent', () => {
  let component: BookPlatformComponent;
  let fixture: ComponentFixture<BookPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
