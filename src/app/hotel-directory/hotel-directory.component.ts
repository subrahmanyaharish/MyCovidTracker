import { Component, OnInit } from '@angular/core';
import { hotel } from './hotel';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hotel-directory',
  templateUrl: './hotel-directory.component.html',
  styleUrls: ['./hotel-directory.component.css']
})
export class HotelDirectoryComponent implements OnInit {
  hotelObj: hotel;
  hotel: string = null;
  city: string = null;
  hotels: hotel[] = [];
  rest : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.rest = this.fb.group({
      hotel: [null,[Validators.required, Validators.minLength(3)]],
      city: [null, [Validators.required, this.forbiddenCity]]
    })
  }

  forbiddenCity = (city: FormControl): {[key: string]: boolean;} | null => {
    
    if(city.value === 'ooty') {
      return {forbiddenCity: true}
    }
    return null;
  }

  onSubmit() {
    console.log(this.rest);
  }

  addHotel() {
    this.hotelObj = new hotel();
    if (this.city === null || this.city === "" || this.hotel == null || this.hotel == "") {
      return
    }
    this.hotelObj.city = this.city;
    this.hotelObj.hotel = this.hotel;
    this.hotels.push(this.hotelObj);
    this.city = null;
    this.hotel = null;
  }

}
