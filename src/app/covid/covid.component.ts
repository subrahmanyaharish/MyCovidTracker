import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../Services/covid-data.service';
import { StateWise } from 'src/Models/StateWise';
import { District } from 'src/Models/district';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

  constructor(private data: CovidDataService, private router: Router, private route: ActivatedRoute) { }
  covidData: any[] = []
  covidDataModel: StateWise[] = []
  state: StateWise = null
  stateName: string = null;
  stateNames: String[] = []

  stateToSearch: string;


  ngOnInit() { 
    this.stateName = this.route.snapshot.params['state']
    if(this.stateName) {
      this.getStateName()
      this.dataStateWise(this.stateName)      
    } 
    else {
        this.getDataForCovid()

    }
  }

   dataStateWise(name: string) {  
    this.state = this.data.getDataStateWise(name);
  }

  districtWise(name: District, state: string) {
    this.router.navigate(['/state', name.districtName, state])
  }

  getDataForCovid() {
    this.data.getCovidDataFromOrg().subscribe(
      data => {
        this.covidData = Object.keys(data).map(e => ({state: e, district: data[e] }))
        this.covidData.forEach(element => {
          let Obj = new StateWise();
          Obj.stateName = element.state;
          Obj.statecode = element.district.statecode;
          let district = Object.keys(element.district.districtData)
                                  .map(e => ({districtName: e, data: element.district.districtData[e] }))
          let districtsDataForModel: District[] = []
          district.forEach(dis => {
            let d = new District();
            d.districtData = dis.data;
            d.districtName = dis.districtName;
            districtsDataForModel.push(d);
          });
          Obj.districtData = districtsDataForModel;
          this.stateNames.push(Obj.stateName);
          this.covidDataModel.push(Obj);
          this.data.covidDataModel.push(Obj);
        });        
        this.dataStateWise('Telangana')
      }
    )  
  }

  getStateName() {
    this.data.covidDataModel.forEach(state=>{
      this.stateNames.push(state.stateName)
    })
  }

}
