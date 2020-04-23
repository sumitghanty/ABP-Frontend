import { Component, OnInit } from '@angular/core';
import { CreateTripService } from '../../core/service/create-trip.service';

@Component({
  selector: 'app-approve-trip',
  templateUrl: './approve-trip.component.html',
  styleUrls: ['./approve-trip.component.scss']
})
export class ApproveTripComponent implements OnInit {
  tripNumber : any;
  tripListData: any;
  emailId: any;
  token: any;
  flightList: any;
  hotelList: any;

  constructor(
    private _createTripService:CreateTripService
  ) { }

  ngOnInit() {
    let userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.emailId = userLoginData.login.userEmail;
    this.token = userLoginData.login.generatedToken;

    this.tripNumber = localStorage.getItem('detailstripNumber');
    const param = {"tripNumber":this.tripNumber};
    this._createTripService.tripDetailsByNumber(this.emailId,this.token,param).subscribe((res: any) => {
      console.log(res);
      this.tripListData = res.tripcreation;
      this.flightList = res.tripcreation.lineItemMaster[0].flightOrTrainBooking;
      this.hotelList = res.tripcreation.lineItemMaster[0].hotelGuestHouseBookingDetaills;
      console.log('this.tripListData',this.tripListData);
    }); 
  }

  approveTrip(){
    //const param = {approveByApprover:'approve',this.tripListData};
    this.tripListData.approveByApprover = 'approve';
    this._createTripService.tripUpdate(this.emailId,this.token,this.tripListData).subscribe((res: any) => {
      console.log(res);
      this.tripListData = res.tripCreationList;
    }); 
  }

}
