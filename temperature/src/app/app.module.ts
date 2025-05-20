import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GridsterModule } from 'angular-gridster2';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/pages/home/home.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { TemperatureComponent } from './component/temperature/temperature.component';
import { TemperatureChartComponent } from './component/temperature-chart/temperature-chart.component';
import { LoginComponent } from './component/pages/login/login.component';
import { SignupComponent } from './component/pages/signup/signup.component';
import { KonamiComponent } from './component/konami/konami.component';

import { TemperatureService } from './service/TemperatureService';
import { TokenInterceptor } from './interceptors/token.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    TemperatureComponent,
    TemperatureChartComponent,
    LoginComponent,
    SignupComponent,
    KonamiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      toastClass: 'ngx-toastr custom-toast',
      enableHtml: true,
      newestOnTop: false
    }),
    NgChartsModule,
    DragDropModule,
    GridsterModule,
    ReactiveFormsModule
  ],
  providers: [TemperatureService,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
