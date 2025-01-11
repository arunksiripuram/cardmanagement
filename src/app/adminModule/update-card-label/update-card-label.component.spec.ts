import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCardLabelComponent } from './update-card-label.component';

describe('UpdateCardLabelComponent', () => {
  let component: UpdateCardLabelComponent;
  let fixture: ComponentFixture<UpdateCardLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCardLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCardLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
