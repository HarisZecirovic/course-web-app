import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupljeniKurseviComponent } from './kupljeni-kursevi.component';

describe('KupljeniKurseviComponent', () => {
  let component: KupljeniKurseviComponent;
  let fixture: ComponentFixture<KupljeniKurseviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupljeniKurseviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupljeniKurseviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
