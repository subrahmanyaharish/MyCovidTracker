import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StateWise } from 'src/Models/StateWise';
import { District } from 'src/Models/district';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  covidData: any[] = []
  covidDataModel: StateWise[] = []
  stateNames: String[] = []

  // covidURL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
  covidURL = "https://api.covid19india.org/state_district_wise.json";
  

  constructor(private http: HttpClient) { }  

  public getCovidDataFromOrg() {
    return this.http.get(this.covidURL)
  }

  public getDataStateWise(state: string) {
    let result = new StateWise()
    this.covidDataModel.forEach(element => {
      if (state === element.stateName) {
        result = {...element}
      }
    });
    return result
  }

}
