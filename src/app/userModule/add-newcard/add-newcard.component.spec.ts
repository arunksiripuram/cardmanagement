import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewcardComponent } from './add-newcard.component';

describe('AddNewcardComponent', () => {
  let component: AddNewcardComponent;
  let fixture: ComponentFixture<AddNewcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
