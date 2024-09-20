import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiterCatalogoModalComponent } from './regiter-catalogo-modal.component';

describe('RegiterCatalogoModalComponent', () => {
  let component: RegiterCatalogoModalComponent;
  let fixture: ComponentFixture<RegiterCatalogoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegiterCatalogoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegiterCatalogoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
