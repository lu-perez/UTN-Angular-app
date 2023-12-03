import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDlcComponent } from './edit-dlc.component';

describe('EditDlcComponent', () => {
  let component: EditDlcComponent;
  let fixture: ComponentFixture<EditDlcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDlcComponent]
    });
    fixture = TestBed.createComponent(EditDlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
