import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PetService } from 'src/app/services/pet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';

import { Pet } from 'src/app/interfaces/animal'; // Substitua 'path/para/sua/interface' pelo caminho correto para sua interface Employee.
import { PetAddEditComponent } from '../pet-add-edit/pet-add-edit.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  displayedColumns: string[] = [
    'petId',
    'name',
    'type',
    'location',
    'age',

    'action',
  ];
  dataSource!: MatTableDataSource<Pet>; // Use a interface 'Employee' como o tipo genérico para MatTableDataSource.

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: PetService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getPetList();
  }

  openAddEditPetForm() {
    const dialogRef = this._dialog.open(PetAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        // Substitua 'any' pelo tipo apropriado se houver algum retorno específico.
        if (val) {
          this.getPetList();
        }
      },
    });
  }

  getPetList() {
    this._empService.getPetList().subscribe({
      next: (res: Pet[]) => {
        // Certifique-se de que 'getEmployeeList()' retorna um array de objetos do tipo 'Employee'.
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePet(id: number) {
    this._empService.deletePet(id).subscribe({
      next: (res: any) => {
        // Substitua 'any' pelo tipo apropriado se houver algum retorno específico.
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getPetList();
      },
      error: console.log,
    });
  }

  openEditForm(data: Pet) {
    //Substitua 'Employee' pelo tipo apropriado se houver algum retorno específico.
    const dialogRef = this._dialog.open(PetAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        // Substitua 'any' pelo tipo apropriado se houver algum retorno específico.
        if (val) {
          this.getPetList();
        }
      },
    });
  }
}
