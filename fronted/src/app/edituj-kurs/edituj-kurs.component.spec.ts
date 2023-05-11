import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditujKursComponent } from './edituj-kurs.component';

describe('EditujKursComponent', () => {
  let component: EditujKursComponent;
  let fixture: ComponentFixture<EditujKursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditujKursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditujKursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
