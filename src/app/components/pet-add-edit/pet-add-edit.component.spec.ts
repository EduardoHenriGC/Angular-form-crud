import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetAddEditComponent } from './pet-add-edit.component';

describe('PetAddEditComponent', () => {
  let component: PetAddEditComponent;
  let fixture: ComponentFixture<PetAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
