import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { TemperatureComponent } from './component/temperature/temperature.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './component/pages/login/login.component';
import { SignupComponent } from './component/pages/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'temperature', component: TemperatureComponent, canActivate: [AuthGuard] }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
