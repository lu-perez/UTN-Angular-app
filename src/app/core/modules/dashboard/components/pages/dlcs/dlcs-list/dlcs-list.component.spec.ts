import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlcsListComponent } from './dlcs-list.component';

describe('DlcsListComponent', () => {
  let component: DlcsListComponent;
  let fixture: ComponentFixture<DlcsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlcsListComponent]
    });
    fixture = TestBed.createComponent(DlcsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
