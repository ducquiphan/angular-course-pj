import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';

import {AppComponent} from './app.component';
import {authInterceptor} from "./auth.interceptor";
import {loginInterceptor} from "./login.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    provideHttpClient(
      withInterceptors([loginInterceptor, authInterceptor]),
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
