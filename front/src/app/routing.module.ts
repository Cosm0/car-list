import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { NotImplementedComponentComponent } from './not-implemented-component/not-implemented-component.component';

const routes: Route[] = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'vehicles',
    component: NotImplementedComponentComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
     }),
  ],
  exports: [ RouterModule ],
})
export class RoutingModule { }
