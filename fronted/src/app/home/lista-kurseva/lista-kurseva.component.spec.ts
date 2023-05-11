import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaKursevaComponent } from './lista-kurseva.component';

describe('ListaKursevaComponent', () => {
  let component: ListaKursevaComponent;
  let fixture: ComponentFixture<ListaKursevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaKursevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaKursevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
