import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidComponent } from './covid/covid.component';
import { StateCasesComponent } from './state-cases/state-cases.component';
import { CovidGuardService } from './route-gaurds/covid-guard.service';

const routes: Routes = [{path:'', pathMatch:'full', redirectTo:'/country'},
                        {path:'country', component: CovidComponent},
                        {path:'country/:state', component: CovidComponent, canActivate:[CovidGuardService]},
                        {path:'state/:district/:stateName', component:StateCasesComponent, canActivate:[CovidGuardService]},
                        {path:'**', redirectTo:'/country'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
