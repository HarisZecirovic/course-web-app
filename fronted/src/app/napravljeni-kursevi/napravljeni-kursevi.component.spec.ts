import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapravljeniKurseviComponent } from './napravljeni-kursevi.component';

describe('NapravljeniKurseviComponent', () => {
  let component: NapravljeniKurseviComponent;
  let fixture: ComponentFixture<NapravljeniKurseviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NapravljeniKurseviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NapravljeniKurseviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
