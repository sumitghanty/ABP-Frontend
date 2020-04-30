import { Component, OnInit } from '@angular/core';
import { CreateTripService } from './../../core/service/create-trip.service';


export class CreateTripFuncComponent implements OnInit {
  public test: any;
  constructor(
    public _createTripService: CreateTripService
  ) { }

  ngOnInit(): void {
  }

  dateConvert(getDate){
      let getDateArr = getDate.split("-");
      let newDate = '';
      if(getDateArr[1].length === 1){
        getDateArr[1] =0+getDateArr[1];
      } else if(getDateArr[0].length === 1) {
        getDateArr[0] = 0+getDateArr[0];
      } 
      newDate =getDateArr[2]+getDateArr[1]+getDateArr[0];
      console.log('newdate',newDate);
      return newDate;
  }

  async save(tripInformation,token,emailId,userId,stepStatus,tripFromLocation,tripToLocation){
    if(stepStatus === 1){  
      localStorage.setItem('fromLocation',tripInformation.fromLocation); // for from city_id
      localStorage.setItem('toLocation',tripInformation.toLocation); // for to city_id
      localStorage.setItem('tripFromLocation',tripFromLocation); // for from city_name
      localStorage.setItem('tripToLocation',tripToLocation); // for from city_name
      localStorage.setItem('wayType',tripInformation.toLocation);

      let travelInfo = {
            "employeeId": userId,
            "travelType": tripInformation.travelType,
            "tripType": tripInformation.wayType ,
            "fromLocation": tripInformation.fromLocation,
            "toLocation": tripInformation.toLocation,
            "startDate": tripInformation.startDate,
            "endDate": tripInformation.endDate,
            "purpose": tripInformation.purpose,
            "tripFor": tripInformation.tripFor,
            "tripDescription": tripInformation.travelDetails,
            "tripCostCentre": tripInformation.tripCostCenter,
            "eventCode": tripInformation.eventCode,
            "employeeEmail": emailId
        }
        return travelInfo;
      } 
  }

  /************ update trip body ****************/
  async updateBody(tripDet,selectedFlight,selectedHotel,saveType,emailId){
    console.log('tripDet------------',selectedFlight);
    let travelllerUserList = [];
    let allTravellerList = [];
    allTravellerList = JSON.parse(localStorage.getItem('userAllList'));
    if(allTravellerList && allTravellerList.length>0){  
      for(const allTravellerLists of allTravellerList){
        let employeeId = '';
        let userType = '';
        if(allTravellerLists.userId){
          employeeId = allTravellerLists.userId;
          userType = 'E';
        } else if(allTravellerLists.retainerId){
          employeeId = allTravellerLists.retainerId;
          userType = 'R';
        } else if(allTravellerLists.type && allTravellerLists.type === 'G'){
          userType = 'G';
        }
          travelllerUserList.push({'passengerName': allTravellerLists.userFirstName,'employeeId':employeeId,userType: userType});
      }
    }
    //let tripDet = JSON.parse(localStorage.getItem('getTripData'));
    let updateTripData = {
      "tripId": tripDet.tripId,
      "tripNumber": tripDet.tripNumber,
      "finalSubmitForTripApprover": saveType, 
      "employeeId": tripDet.employeeId,
      "travelType": tripDet.travelType,
      "tripType": tripDet.tripType,
      "fromLocation": tripDet.fromLocation,
      "toLocation": tripDet.toLocation,
      "startDate": tripDet.startDate,
      "endDate": tripDet.endDate,
      "purpose": tripDet.purpose,
      "tripFor": tripDet.tripFor,
      "tripDescription": tripDet.tripDescription,
      "tripCostCentre": tripDet.tripCostCentre,
      "eventCode": tripDet.eventCode,
      "employeeEmail": null,
      "pendingWithEmail": emailId,
      "tripUserMapping": travelllerUserList,
      "lineItemMaster":[{
        "lineItemtype":"2",
        "tripId": tripDet.tripId,
        "flightOrTrainBooking": selectedFlight,
        "hotelGuestHouseBookingDetaills": selectedHotel
      }]
  
    }
    return updateTripData;
  }
  /************* end update trip body ************/

  /****** search flight *******/
  async searchFlight(token,email,fromCityShortCode,toCityShortCode,travelStop,startDate,endDate){
      let searchVal = {
        "queryData":{
          "source": fromCityShortCode,  
          "destination": toCityShortCode,
          "dateOfDeparture": startDate,
          "dateOfArrival": endDate,
          "adults":"1"
        },
        "customFilters":
        {
          "airline":"indigo",
          "stops": travelStop
        }   
      }
      return searchVal;
    } 
    

}
