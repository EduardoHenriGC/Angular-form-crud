import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

import { PetComponent } from '../pet/pet.component';
import { Pet } from 'src/app/interfaces/animal';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-add-edit',
  templateUrl: './pet-add-edit.component.html',
  styleUrls: ['./pet-add-edit.component.scss'],
})
export class PetAddEditComponent implements OnInit {
  petForm: FormGroup;
  pet: Pet[] = [];

  type: string[] = ['cachorro', 'gato', 'porco', 'cavalo'];

  constructor(
    private _fb: FormBuilder,
    private _empService: PetService,
    private _dialogRef: MatDialogRef<PetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet | null, // Altere o tipo de 'data' para 'Employee | null'
    private _coreService: CoreService
  ) {
    this.petForm = this._fb.group({
      name: '',
      type: '',
      location: '',
      age: '',
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.petForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.petForm.valid) {
      if (this.data) {
        // For updating an existing employee, add the 'id' property to 'empForm.value'
        this.petForm.value.petId = this.data.petId;
        this._empService
          .updatePet(this.data.petId, this.petForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        // For adding a new employee, call 'addEmployee()' directly
        this._empService.addPet(this.petForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
