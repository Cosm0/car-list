import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { VehiclesMainComponent } from './vehicles-main/vehicles-main.component';

const routes: Route[] = [{
  path: '',
  component: VehiclesMainComponent,
  pathMatch: 'prefix',
}];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VehiclesRoutingModule { }
