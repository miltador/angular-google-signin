import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GoogleSignInComponent} from "../../../../src/google-signin.component";


@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
