import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QweComponent } from './qwe.component';

describe('QweComponent', () => {
  let component: QweComponent;
  let fixture: ComponentFixture<QweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
