import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NotImplementedComponentComponent } from './not-implemented-component/not-implemented-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NotImplementedComponentComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot({}, {}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
