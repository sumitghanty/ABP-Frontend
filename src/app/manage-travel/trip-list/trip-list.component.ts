import { Component, OnInit } from '@angular/core';
import { CreateTripService } from './../create-trip/create-trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  userFisrtname : any; 
  getCity:any;
  allTravellerList:any;
  emailId:any;
  token:any;
  userId:any;
  tripListData:any;



  constructor(private _createTripService:CreateTripService) { }

  ngOnInit() {
    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.getCity = userLoginData.masterResponseModel.cityMaster;
    console.log('this.userLoginData',userLoginData);

    this.allTravellerList =  JSON.parse(localStorage.getItem('userAllList'));

    this.emailId = userLoginData.login.userEmail;
    this.token = userLoginData.login.generatedToken;
    this.userId = userLoginData.login.userId;

    this._createTripService.getTripList(this.emailId,this.token).subscribe((res: any) => {
      console.log(res);
      this.tripListData = res.tripCreationList;
    }); 
  }

}
