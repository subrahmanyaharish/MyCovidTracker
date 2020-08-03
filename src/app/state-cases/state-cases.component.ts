import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { CovidDataService } from '../Services/covid-data.service';
import { StateWise } from 'src/Models/StateWise';
import { ActivatedRoute, Router } from '@angular/router';
import { District } from 'src/Models/district'; 
import { ChartData } from 'src/Models/chart'; 

@Component({
  selector: 'app-state-cases',
  templateUrl: './state-cases.component.html',
  styleUrls: ['./state-cases.component.css']
})
export class StateCasesComponent implements OnInit {

  constructor(private data: CovidDataService, private route: ActivatedRoute, private router: Router) { }
  state: StateWise
  stateName: string
  districtName: string
  districtData: District
  

  ngOnInit() {
    this.stateName = this.route.snapshot.params['stateName']
    this.districtName = this.route.snapshot.params['district']
    this.dataStateWise(this.stateName)
  }

  returnToState() {
    this.router.navigate(['/country', this.stateName])
  }

  dataStateWise(name: string) {
    this.state = this.data.getDataStateWise(name);
    this.state.districtData.forEach(element => {
      if (element.districtName == this.districtName) {
        this.districtData = element
      }
    })
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: this.districtData.districtName
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.districtData.districtData.active, label: "Active" },
          { y: this.districtData.districtData.confirmed, label: "Confirmed" },
          { y: this.districtData.districtData.deceased, label: "Deceased" },
          { y: this.districtData.districtData.recovered, label: "Recovered" },
        ]
      }]
    });
      
    chart.render();
    this.pichart()
  }

  pichart() {
    let chart = new CanvasJS.Chart("pi", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      // title:{
      //   text: this.districtName
      // },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: this.districtData.districtData.active, name: "Active" },
          { y: this.districtData.districtData.confirmed, name: "Confirmed" },
          { y: this.districtData.districtData.deceased, name: "Deceased" },
          { y: this.districtData.districtData.recovered, name: "Recovered" },
        ]
      }]
    });
      
    chart.render();
  }

}
