import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssesmentComponent } from './update-assesment.component';

describe('UpdateAssesmentComponent', () => {
  let component: UpdateAssesmentComponent;
  let fixture: ComponentFixture<UpdateAssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
