import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CovidDataService } from '../Services/covid-data.service';

@Injectable({
  providedIn: 'root'
})
export class CovidGuardService implements CanActivate {

  constructor(private data: CovidDataService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.data.covidDataModel.length === 0) {
      this.router.navigate([''])
    }
    return true
  }
}
