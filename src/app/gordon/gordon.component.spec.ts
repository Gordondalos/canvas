import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GordonComponent } from './gordon.component';

describe('GordonComponent', () => {
  let component: GordonComponent;
  let fixture: ComponentFixture<GordonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GordonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GordonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
