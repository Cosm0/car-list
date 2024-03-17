import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

import { NotImplementedComponentComponent } from './not-implemented-component/not-implemented-component.component';
import { canActivateProtectedRoute } from './guards/canActivateProtectedRoute.guard';

const routes: Route[] = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'vehicles',
    component: NotImplementedComponentComponent,
    canActivate: [canActivateProtectedRoute]
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
