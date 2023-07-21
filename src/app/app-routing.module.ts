import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { PetComponent } from './components/pet/pet.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'pet', component: PetComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
