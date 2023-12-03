import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlcDetailComponent } from './dlc-detail.component';

describe('DlcDetailComponent', () => {
  let component: DlcDetailComponent;
  let fixture: ComponentFixture<DlcDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlcDetailComponent]
    });
    fixture = TestBed.createComponent(DlcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
