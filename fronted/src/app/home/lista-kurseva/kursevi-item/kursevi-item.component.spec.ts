import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KurseviItemComponent } from './kursevi-item.component';

describe('KurseviItemComponent', () => {
  let component: KurseviItemComponent;
  let fixture: ComponentFixture<KurseviItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KurseviItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KurseviItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
