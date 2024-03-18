import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { VehiclesMainComponent } from './vehicles-main/vehicles-main.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  declarations: [
    VehiclesMainComponent,
  ],
  imports: [
    VehiclesRoutingModule,
    SharedModule,
    MatTableModule,
  ],
  exports: []
})
export class RecipesModule { }
