import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Route[] = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
})
export class RoutingModule { }
