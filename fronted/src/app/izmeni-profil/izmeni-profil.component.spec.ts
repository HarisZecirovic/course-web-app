import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniProfilComponent } from './izmeni-profil.component';

describe('IzmeniProfilComponent', () => {
  let component: IzmeniProfilComponent;
  let fixture: ComponentFixture<IzmeniProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
