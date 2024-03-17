import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SigninComponent } from './signin/signin.component';
import { ResponseErrorInterceptorService } from '../shared/response-error-interceptor.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { SharedModule } from '../shared/shared.module';

const routes: Route[] = [
  {
    path: '',
    component: SigninComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  exports: []
})
export class AuthModule { }
