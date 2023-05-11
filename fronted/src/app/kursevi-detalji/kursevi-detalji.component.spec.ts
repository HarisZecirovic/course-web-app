import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KurseviDetaljiComponent } from './kursevi-detalji.component';

describe('KurseviDetaljiComponent', () => {
  let component: KurseviDetaljiComponent;
  let fixture: ComponentFixture<KurseviDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KurseviDetaljiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KurseviDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
