import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookPopUpComponent } from './search-book-pop-up.component';

describe('SearchBookPopUpComponent', () => {
  let component: SearchBookPopUpComponent;
  let fixture: ComponentFixture<SearchBookPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBookPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBookPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
