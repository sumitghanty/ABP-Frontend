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
  toCityName: any;
  fromCityName: any;
  tripForDesc: any;
  purposeDesc: any;
  userLoginData: any;

  constructor(
    private _createTripService:CreateTripService
  ) { }

  ngOnInit() {
    this.userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.emailId = this.userLoginData.login.userEmail;
    this.token = this.userLoginData.login.generatedToken;

    this.tripNumber = localStorage.getItem('detailstripNumber');
    const param = {"tripNumber":this.tripNumber};
    this._createTripService.tripDetailsByNumber(this.emailId,this.token,param).subscribe((res: any) => {
      console.log(res);
      this.tripListData = res.tripcreation;

      // from city name
      debugger
      let getCity = this.userLoginData.masterResponseModel.cityMaster;
      let toCityArr= getCity.filter(ele => ele.cityid == this.tripListData.toLocation)
      this.toCityName = toCityArr[0].cityName;
      
      //to city name
      let fromCityArr = getCity.filter(ele => ele.cityid == this.tripListData.fromLocation)
      this.fromCityName = fromCityArr[0].cityName;

      //trip for 
      let tripForMaster = this.userLoginData.masterResponseModel.tripForMaster
      let tripForArr = tripForMaster.filter(ele => ele.tripForMasterId == this.tripListData.tripFor);
      this.tripForDesc = tripForArr[0].tripForMasterDescription;
      
      // pupose master
      let purposeMaster = this.userLoginData.masterResponseModel.purposeMaster
      let purposeSelectedArr = purposeMaster.filter(ele => ele.purposeId == this.tripListData.purpose);
      this.purposeDesc = purposeSelectedArr[0].purposeDescription;

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
