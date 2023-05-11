import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniLozinkuComponent } from './izmeni-lozinku.component';

describe('IzmeniLozinkuComponent', () => {
  let component: IzmeniLozinkuComponent;
  let fixture: ComponentFixture<IzmeniLozinkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniLozinkuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniLozinkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
