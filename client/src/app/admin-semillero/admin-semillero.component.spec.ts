import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSemilleroComponent } from './admin-semillero.component';

describe('AdminHomeComponent', () => {
  let component: AdminSemilleroComponent;
  let fixture: ComponentFixture<AdminSemilleroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSemilleroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
