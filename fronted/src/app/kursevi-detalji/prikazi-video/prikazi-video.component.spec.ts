import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikaziVideoComponent } from './prikazi-video.component';

describe('PrikaziVideoComponent', () => {
  let component: PrikaziVideoComponent;
  let fixture: ComponentFixture<PrikaziVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikaziVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikaziVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
