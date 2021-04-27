import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_guards/auth.guard';




const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'tweets',component:TweetsComponent,canActivate:[AuthGuard]},
  {path:'users',component:UsersComponent},
  // {path:'**',component:HomeComponent,pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
