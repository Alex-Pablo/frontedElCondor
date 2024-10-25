import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitofmeasurePopupComponent } from './unitofmeasure-popup.component';

describe('UnitofmeasurePopupComponent', () => {
  let component: UnitofmeasurePopupComponent;
  let fixture: ComponentFixture<UnitofmeasurePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitofmeasurePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitofmeasurePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
