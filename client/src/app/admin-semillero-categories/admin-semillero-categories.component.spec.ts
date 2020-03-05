import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSemilleroCategoriesComponent } from './admin-semillero-categories.component';

describe('AdminSemilleroCategoriesComponent', () => {
  let component: AdminSemilleroCategoriesComponent;
  let fixture: ComponentFixture<AdminSemilleroCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSemilleroCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSemilleroCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
