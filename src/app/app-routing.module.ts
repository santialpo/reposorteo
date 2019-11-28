import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultsComponent} from './results/results.component';
import {BodyComponent} from './ui/body/body.component';
import {AuthComponent} from './auth/auth.component';
import {PeopleComponent} from './people/people.component';
import {AwardComponent} from './award/award.component';
import {PlayComponent} from './play/play.component';
import {AuthGuard} from './guard/auth-guard';
import {LoginGuard} from './guard/login-guard';



const routes: Routes = [
  { path:'',redirectTo:'/Home',pathMatch:'full'},
  { path:'Home',component: BodyComponent},
  { path:'resultados',component: ResultsComponent},
  { path:'login',component:AuthComponent,canActivate:[LoginGuard]},
  { path:'participantes',component:PeopleComponent,canActivate:[AuthGuard]},
  { path:'premios',component:AwardComponent,canActivate:[AuthGuard]},
  { path:'sorteo',component:PlayComponent,canActivate:[AuthGuard]}
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
