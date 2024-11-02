import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgetPassword/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';


export const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'signup',component: SignupComponent},
   {path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
   {path: 'forgetPassword', component: ForgotPasswordComponent},
   {path: 'manage-profile',component: ManageProfileComponent},
   {path: '', redirectTo: '/login',pathMatch:'full'},
   {path: '**', redirectTo: '/login'  }
];
