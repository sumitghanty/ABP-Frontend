import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatHorizontalStepper } from '@angular/material/stepper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TravellerModalComponent } from './traveller-modal/traveller-modal.component';
import { CreateTripService } from './create-trip.service';
import {MatStepper} from '@angular/material/stepper';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

    frmTravellerInformation: FormGroup;
    travelType: any;
    //internationalTravel: any;
    wayType: any;
    roundWay: any;
    fromLocation: any;
    toLocation: any;
    startDate: any;
    endDate: any;
    purpose: any;
    tripFor: any;
    travelDetails: any;
    tripCostCenter: any;
    eventCode: any;
    purposeMaster:any;
    tripForMaster:any;
    costCenter:any;
    eventMaster:any;

    getCity : any;
    token: any;
    emailId: any;
    userDet: any;
    userId: any;
    allTravellerList:any;
    tripFromLocation:any;
    tripToLocation:any;
  
    tripType:any;
    departtureTime:any;
    arrivalTime:any;
    travelStop:any;

    getFlightData:any;
    getHotelData:any;
    tripId:any;
    tripDet:any;
    selectedFlight = [];
    selectedHotel = [];
    flightSelectedStatus = false;
    flightSelectedRetrunStatus = false;
    returnflights: any;

    hotelSelectedStatus = false;
    config_city = {
      displayKey: 'city_name', // if objects array passed which key to be displayed defaults to description
      search: true,
      height: '200px',
      placeholder: 'Select',
      limitTo: 0
    };


    test_form: any;

    ///sort 
    fareSort = 'A';
    arrivalSort = '';
    timeSort = '';
    deparSort = '';

    flightTripType = '';

    ///error
    
    travelTypeError = false;
    wayTypeError = false;
    fromLocationError = false;
    toLocationError = false;
    startDateError = false;
    endDateError = false;
    purposeError = false;
    tripForError = false;
    fromCityName : any;
    toCityName : any;

    //hotel
    starRating: any;
    userRating: any;
    hotelMeal: any;
    hotelLocality: any;
    hotelName: any;
    selectReasonHotel: any;

    @ViewChild('stepper') private myStepper: MatStepper;
    totalStepsCount: number;
    stepStatus = 1;

  constructor(
    public dialog: MatDialog,
    public _createTripService: CreateTripService,
    private formBuilder:FormBuilder,
    private datePipe: DatePipe
    //private snackBar: MatSnackBar
   
  ) {

      this._createTripService.dataString$.subscribe(
        data => {
          //if(this.myName !== data){
            this.allTravellerList = data;
           // this.getServersData(this.myName);
          //}
        });

   }

  ngOnInit() {

    this.frmTravellerInformation = this.formBuilder.group({
      travelType: ['', Validators.required],
      wayType: ['', Validators.required],
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      purpose: ['', Validators.required],
      tripFor: ['', Validators.required],
      travelDetails: [''],
      tripCostCenter: [''],
      eventCode: ['']
    });
    this.purpose = '';
    this.tripFor = '';
    this.departtureTime = '';
    this.arrivalTime = '';
    this.travelStop = '';

    this.starRating = '';
    this.userRating = '';
    this.hotelMeal = '';
    this.hotelLocality = '';
    this.hotelName = '';

    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.getCity = userLoginData.masterResponseModel.cityMaster;

    this.purposeMaster = userLoginData.masterResponseModel.purposeMaster
    this.tripForMaster = userLoginData.masterResponseModel.tripForMaster
    this.costCenter = userLoginData.masterResponseModel.costCenter
    this.eventMaster = userLoginData.masterResponseModel.eventMaster

    this.allTravellerList =  JSON.parse(localStorage.getItem('userAllList'));

    this.emailId = userLoginData.login.userEmail;
    this.token = userLoginData.login.generatedToken;
    this.userId = userLoginData.login.userId;

   this.tripFromLocation = localStorage.getItem('fromLocation');
   this.tripToLocation = localStorage.getItem('fromLocation');

    this._createTripService.getUserList(this.emailId,this.token).subscribe((res: any) => {
      console.log(res);
      this.userDet = res;
    });    

  }
  onStep(data) {}

  // Event fired after view is initialized
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  travDetDivOpen(inumber,travType){
    console.log('inumber',inumber);
    console.log('travType',travType);
    //debugger
    if(travType!==undefined && travType === 'G'){
      document.getElementById("travDiv"+inumber).style.display = "";
    } else if(travType !== 'G'){
      document.getElementById("travDivE"+inumber).style.display = "";
    }
    document.getElementById("travFirstDiv"+inumber).style.display = "none";
  }

  travDetDivClose(inumber,travType){
    if(travType!==undefined && travType === 'G'){   
      document.getElementById("travDiv"+inumber).style.display = "none";
    } else if(travType !== 'G'){ 
      document.getElementById("travDivE"+inumber).style.display = "none";
    }
      document.getElementById("travFirstDiv"+inumber).style.display = "";
  }

  
  goForward(stepper: MatStepper) {
    console.log(stepper)
    stepper.next();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TravellerModalComponent, {
      width: '35%',
      height: 'auto',
      data: 'test'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  

  goBack(stepper: MatStepper) {
    this.stepStatus--;
    stepper.previous();
  }

  getFromLocation(getData){
    console.log(getData);
    if(getData.value !== undefined){
      this.fromLocation = getData.value.city_id;
      this.fromCityName = getData.value.city_name;
    } else {
      this.fromLocation = '';
    }
  }

  getToLocation(getData){
    console.log(getData);
    if(getData.value !== undefined){
      this.toLocation = getData.value.city_id;
      this.toCityName = getData.value.city_name;
    } else{
      this.toLocation = '';
    }
  }
  


  save(stepper: MatStepper){
    //console.log('tripInfo------',this);
  if(this.stepStatus === 1){  
    if(this.frmTravellerInformation.invalid){

        if(this.travelType){
          this.travelTypeError = false;
        } else {
          this.travelTypeError = true;
        }
        if(this.wayType){
          this.wayTypeError = false;
        } else {
          this.wayTypeError = true;
        }
        if(!this.fromLocation){
          this.fromLocationError = true;
        } else {
          this.toLocationError = false;
        }
        if(!this.toLocation){
          this.toLocationError = true;
        } else {
          this.toLocationError = false;
        }
        if(!this.startDate){
          this.startDateError = true;
        } else {
          this.startDateError = false;
        }
        if(!this.endDate){
          this.endDateError = true;
        } else {
          this.endDateError = false;
        }

        if(!this.purpose){
          this.purposeError = true;
        } else {
          this.purposeError = false;
        }
        
        if(!this.tripFor){
          this.tripForError = true;
        } else {
          this.tripForError = false;
        }
      return;
    }

    //remove validation message
    this.travelTypeError = false;
    this.wayTypeError = false;
    this.fromLocationError = false;
    this.toLocationError = false;
    this.startDateError = false;
    this.endDateError = false;
    this.purposeError = false;
    this.tripForError = false;


    stepper.next();
    console.log('stepStatus',this.stepStatus);
    localStorage.setItem('fromLocation',this.fromLocation);
    localStorage.setItem('toLocation',this.toLocation);
    localStorage.setItem('wayType',this.toLocation);

    this.tripFromLocation = this.fromCityName;
    this.tripToLocation = this.toCityName;
    console.log('wayType',this.wayType);
    this.flightTripType = this.wayType
    
    // let travelInfo = {
    //     domesticTravel: this.travelType,
    //     //internationalTravel: this.internationalTravel,
    //     oneWay: this.wayType,
    //     //roundWay: this.roundWay,
    //     fromLocation: this.fromLocation,
    //     toLocation: this.toLocation,
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     purpose: this.purpose,
    //     tripFor: this.tripFor,
    //     travelDetails: this.travelDetails,
    //     tripCostCenter: this.tripCostCenter,
    //     eventCode: this.eventCode
    // };
    //console.log('this.userId',this.userId);
    let travelInfo = {
          "employeeId": this.userId,
          "travelType": this.travelType,
          "tripType": this.wayType ,
          "fromLocation": this.fromLocation,
          "toLocation": this.toLocation,
          "startDate": this.startDate,
          "endDate": this.endDate,
          "purpose": this.purpose,
          "tripFor": this.tripFor,
          "tripDescription": this.travelDetails,
          "tripCostCentre": this.tripCostCenter,
          "eventCode": this.eventCode,
          "employeeEmail":"sumit.ghanty@gmail.com"
      }
      this._createTripService.tripSave(this.emailId,this.token,travelInfo).subscribe((res: any) => {
        console.log(res);
        this.tripId = res.tripcreation.tripid;
        this.tripDet = res.tripcreation;
        this.stepStatus++;
      });
    } 
    /********************** update trip ****************************/
    else if(this.stepStatus > 1){
      console.log('update');
      console.log('this.tripdet', this.tripDet);

      let travelllerUserList = [];

      for(const allTravellerLists of this.allTravellerList){
        let employeeId = '';
        if(allTravellerLists.userId){
          employeeId = allTravellerLists.userId;
        } else if(allTravellerLists.retainerId){
          employeeId = allTravellerLists.retainerId;
        }
        travelllerUserList.push({'passengerName': allTravellerLists.userFirstName,'employeeId':employeeId});
      }


      let updateTripData = {
        "tripId": this.tripId,
        "employeeId": this.tripDet.employeeId,
        "travelType": this.tripDet.travelType,
        "tripType": this.tripDet.tripType,
        "fromLocation": this.tripDet.fromLocation,
        "toLocation": this.tripDet.toLocation,
        "startDate": this.tripDet.startDate,
        "endDate": this.tripDet.endDate,
        "purpose": this.tripDet.purpose,
        "tripFor": this.tripDet.tripFor,
        "tripDescription": this.tripDet.tripDescription,
        "tripCostCentre": this.tripDet.tripCostCentre,
        "eventCode": this.tripDet.eventCode,
        "employeeEmail": null,
        "tripUserMapping": travelllerUserList,
        "lineItemMaster":[{
          "lineItemtype":"2",
          "tripId":1,
          "flightOrTrainBooking": this.selectedFlight,
          "hotelGuestHouseBookingDetaills": this.selectedHotel
        }]
      }
      this._createTripService.tripUpdate(this.emailId,this.token,updateTripData).subscribe((res: any) => {
        console.log(res);
        this.stepStatus++;
      });
    } //else if(this.stepStatus === 6 ){
      //console.log('update final save');
      // this._createTripService.tripSave(this.emailId,this.token,travelInfo2).subscribe((res: any) => {
      //   console.log(res);
      // });
    //}
  }

  deleteTraveller(indexNo){
    console.log('index',indexNo);
    console.log('this.allTravellerList length',this.allTravellerList.length);
    //delete this.allTravellerList[indexNo];
    this.allTravellerList.splice(indexNo, 1);
    localStorage.setItem('userAllList',JSON.stringify(this.allTravellerList));
    console.log('this.allTravellerList.length ----',this.allTravellerList.length);
    
  }

  getFlight(){
    console.log('triptype',this.wayType);
    if(!this.departtureTime || !this.arrivalTime || !this.travelStop){
      this.departtureTime = false;
      this.arrivalTime = false;
      this.travelStop = false;
      return
    } else {
    let searchVal = {
        "queryData":{
          "source": this.tripFromLocation,  
          "destination": this.tripToLocation,
          "dateOfDeparture":"20200929",
          "dateOfArrival":"20201003",
          "adults":"1"
          
        },
        "customFilters":
        {
          "airline":"indigo",
          "stops": this.travelStop
        }   
     }

     const flightDa = 
     {
       "flightResponse": {
         "onwardflights": [
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "04:50",
             "arrTime": "07:45",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"6181\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"04:50\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 55m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"6181\",\"destination\":\"CCU\",\"FlHash\":\"o6E-6181\",\"stops\":\"0\",\"seatsavailable\":\"20\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1605.118,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 55m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0450\",\"arrtime\":\"07:45\",\"arrdate\":\"2020-09-29t0745\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "6181",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "07:45",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "07:30",
             "arrTime": "10:20",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"6749\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"07:30\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"6749\",\"destination\":\"CCU\",\"FlHash\":\"o6E-6749\",\"stops\":\"0\",\"seatsavailable\":\"20\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1502.2338,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 50m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0730\",\"arrtime\":\"10:20\",\"arrdate\":\"2020-09-29t1020\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "6749",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "10:20",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "09:20",
             "arrTime": "12:00",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"374\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"09:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 40m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"374\",\"destination\":\"CCU\",\"FlHash\":\"o6E-374\",\"stops\":\"0\",\"seatsavailable\":\"18\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1332.95,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 40m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0920\",\"arrtime\":\"12:00\",\"arrdate\":\"2020-09-29t1200\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "374",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "12:00",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "11:35",
             "arrTime": "14:25",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"323\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"11:35\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"323\",\"destination\":\"CCU\",\"FlHash\":\"o6E-323\",\"stops\":\"0\",\"seatsavailable\":\"18\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1502.2338,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 50m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1135\",\"arrtime\":\"14:25\",\"arrdate\":\"2020-09-29t1425\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "323",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "14:25",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "15:45",
             "arrTime": "18:40",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"5313\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"2\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"15:45\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 55m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"5313\",\"destination\":\"CCU\",\"FlHash\":\"o6E-5313\",\"stops\":\"0\",\"seatsavailable\":\"20\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1605.118,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 55m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1545\",\"arrtime\":\"18:40\",\"arrdate\":\"2020-09-29t1840\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "5313",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "18:40",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "18:10",
             "arrTime": "21:10",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"395\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"18:10\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"3h 0m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"395\",\"destination\":\"CCU\",\"FlHash\":\"o6E-395\",\"stops\":\"0\",\"seatsavailable\":\"20\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1712.1516,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"3h 0m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1810\",\"arrtime\":\"21:10\",\"arrdate\":\"2020-09-29t2110\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "395",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "21:10",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "20:20",
             "arrTime": "23:10",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"5153\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"20:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"5153\",\"destination\":\"CCU\",\"FlHash\":\"o6E-5153\",\"stops\":\"0\",\"seatsavailable\":\"20\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1502.2338,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 50m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t2020\",\"arrtime\":\"23:10\",\"arrdate\":\"2020-09-29t2310\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "5153",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "23:10",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "22:10",
             "arrTime": "00:55",
             "fare": 4150,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"587\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"22:10\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 45m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"587\",\"destination\":\"CCU\",\"FlHash\":\"o6E-587\",\"stops\":\"0\",\"seatsavailable\":\"18\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":1414.995,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4150,\"totalbasefare\":3149,\"adultbasefare\":3149,\"totalfare\":4150,\"totalsurcharge\":0,\"adulttotalfare\":4150,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 45m\",\"searchKey\":\"0:0:0:0:0:3149:0:4150:0:0:0:0:0:0:0:0:4150:3149:4150:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t2210\",\"arrtime\":\"00:55\",\"arrdate\":\"2020-09-30t0055\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "587",
             "origin": "BOM",
             "destination": "CCU",
             "finalArrivalTime": "00:55",
             "onwardflights": null
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "02:20",
             "arrTime": "03:55",
             "fare": 3689,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"272\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"02:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"6h 0m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"272\",\"destination\":\"HYD\",\"FlHash\":\"o6E-272_6E-353\",\"stops\":\"1\",\"seatsavailable\":\"46\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":47287.562,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3689,\"totalbasefare\":2460,\"adultbasefare\":2460,\"totalfare\":3689,\"totalsurcharge\":0,\"adulttotalfare\":3689,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"1h 35m\",\"searchKey\":\"0:0:0:0:0:2460:0:3689:0:0:0:0:0:0:0:0:3689:2460:3689:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0220\",\"arrtime\":\"03:55\",\"arrdate\":\"2020-09-29t0355\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"06:15\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"353\",\"destination\":\"CCU\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"46\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 5m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0615\",\"arrtime\":\"08:20\",\"arrdate\":\"2020-09-29t0820\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "272",
             "origin": "BOM",
             "destination": "HYD",
             "finalArrivalTime": "08:20",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "06:15",
                 "arrTime": "08:20",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "353",
                 "origin": "HYD",
                 "destination": "CCU",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "05:35",
             "arrTime": "07:25",
             "fare": 3689,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"461\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"05:35\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 25m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"461\",\"destination\":\"HYD\",\"FlHash\":\"o6E-461_6E-6358\",\"stops\":\"1\",\"seatsavailable\":\"44\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":47149.76,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3689,\"totalbasefare\":2460,\"adultbasefare\":2460,\"totalfare\":3689,\"totalsurcharge\":0,\"adulttotalfare\":3689,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"1h 50m\",\"searchKey\":\"0:0:0:0:0:2460:0:3689:0:0:0:0:0:0:0:0:3689:2460:3689:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0535\",\"arrtime\":\"07:25\",\"arrdate\":\"2020-09-29t0725\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"08:50\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"6358\",\"destination\":\"CCU\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"44\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 10m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0850\",\"arrtime\":\"11:00\",\"arrdate\":\"2020-09-29t1100\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "461",
             "origin": "BOM",
             "destination": "HYD",
             "finalArrivalTime": "11:00",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "08:50",
                 "arrTime": "11:00",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "6358",
                 "origin": "HYD",
                 "destination": "CCU",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "08:30",
             "arrTime": "10:05",
             "fare": 3689,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"382\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"08:30\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 40m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"382\",\"destination\":\"HYD\",\"FlHash\":\"o6E-382_6E-6557\",\"stops\":\"1\",\"seatsavailable\":\"43\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":47205.375,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3689,\"totalbasefare\":2460,\"adultbasefare\":2460,\"totalfare\":3689,\"totalsurcharge\":0,\"adulttotalfare\":3689,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"1h 35m\",\"searchKey\":\"0:0:0:0:0:2460:0:3689:0:0:0:0:0:0:0:0:3689:2460:3689:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t0830\",\"arrtime\":\"10:05\",\"arrdate\":\"2020-09-29t1005\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"12:05\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"6557\",\"destination\":\"CCU\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"43\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 5m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1205\",\"arrtime\":\"14:10\",\"arrdate\":\"2020-09-29t1410\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "382",
             "origin": "BOM",
             "destination": "HYD",
             "finalArrivalTime": "14:10",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "12:05",
                 "arrTime": "14:10",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "6557",
                 "origin": "HYD",
                 "destination": "CCU",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "12:15",
             "arrTime": "13:50",
             "fare": 3689,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"821\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"12:15\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"821\",\"destination\":\"HYD\",\"FlHash\":\"o6E-821_6E-997\",\"stops\":\"1\",\"seatsavailable\":\"43\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":47245.453,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3689,\"totalbasefare\":2460,\"adultbasefare\":2460,\"totalfare\":3689,\"totalsurcharge\":0,\"adulttotalfare\":3689,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"1h 35m\",\"searchKey\":\"0:0:0:0:0:2460:0:3689:0:0:0:0:0:0:0:0:3689:2460:3689:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1215\",\"arrtime\":\"13:50\",\"arrdate\":\"2020-09-29t1350\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"15:55\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"997\",\"destination\":\"CCU\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"43\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 10m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1555\",\"arrtime\":\"18:05\",\"arrdate\":\"2020-09-29t1805\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "821",
             "origin": "BOM",
             "destination": "HYD",
             "finalArrivalTime": "18:05",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "15:55",
                 "arrTime": "18:05",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "997",
                 "origin": "HYD",
                 "destination": "CCU",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "16:55",
             "arrTime": "18:30",
             "fare": 3689,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"834\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"16:55\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"834\",\"destination\":\"HYD\",\"FlHash\":\"o6E-834_6E-944\",\"stops\":\"1\",\"seatsavailable\":\"43\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":47245.453,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3689,\"totalbasefare\":2460,\"adultbasefare\":2460,\"totalfare\":3689,\"totalsurcharge\":0,\"adulttotalfare\":3689,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"1h 35m\",\"searchKey\":\"0:0:0:0:0:2460:0:3689:0:0:0:0:0:0:0:0:3689:2460:3689:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t1655\",\"arrtime\":\"18:30\",\"arrdate\":\"2020-09-29t1830\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"20:30\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"944\",\"destination\":\"CCU\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"43\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 15m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t2030\",\"arrtime\":\"22:45\",\"arrdate\":\"2020-09-29t2245\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "834",
             "origin": "BOM",
             "destination": "HYD",
             "finalArrivalTime": "22:45",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "20:30",
                 "arrTime": "22:45",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "944",
                 "origin": "HYD",
                 "destination": "CCU",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "20:35",
             "arrTime": "22:40",
             "fare": 4276,
             "flightData": "{\"origin\":\"BOM\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"5307\",\"Group\":\"\",\"farebasis\":\"SSPL\",\"depterminal\":\"2\",\"holdflag\":\"\",\"CINFO\":\"air-BOM-CCU-20200929--1-0-0-E-100--\",\"deptime\":\"20:35\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 40m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"5307\",\"destination\":\"MAA\",\"FlHash\":\"o6E-5307_6E-326\",\"stops\":\"1\",\"seatsavailable\":\"4\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":47287.14,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4276,\"totalbasefare\":2819,\"adultbasefare\":2819,\"totalfare\":4276,\"totalsurcharge\":0,\"adulttotalfare\":4276,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"BOMCCU20200929E6E\",\"splitduration\":\"2h 5m\",\"searchKey\":\"0:0:0:0:0:2819:0:4276:0:0:0:0:0:0:0:0:4276:2819:4276:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t2035\",\"arrtime\":\"22:40\",\"arrdate\":\"2020-09-29t2240\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"MAA\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"Q015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"deptime\":\"23:55\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"326\",\"destination\":\"CCU\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"4\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 20m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-09-29t2355\",\"arrtime\":\"02:15\",\"arrdate\":\"2020-09-30t0215\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "5307",
             "origin": "BOM",
             "destination": "MAA",
             "finalArrivalTime": "02:15",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "23:55",
                 "arrTime": "02:15",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "326",
                 "origin": "MAA",
                 "destination": "CCU",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           }
         ],
         "returnflights": [
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "05:25",
             "arrTime": "08:05",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"318\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"05:25\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 40m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"318\",\"destination\":\"BOM\",\"FlHash\":\"r6E-318\",\"stops\":\"0\",\"seatsavailable\":\"10\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8565.418,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 40m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0525\",\"arrtime\":\"08:05\",\"arrdate\":\"2020-10-03t0805\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "318",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "08:05",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "06:45",
             "arrTime": "09:40",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"496\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"06:45\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 55m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"496\",\"destination\":\"BOM\",\"FlHash\":\"r6E-496\",\"stops\":\"0\",\"seatsavailable\":\"10\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8587.978,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 55m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0645\",\"arrtime\":\"09:40\",\"arrdate\":\"2020-10-03t0940\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "496",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "09:40",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "08:15",
             "arrTime": "11:10",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"5379\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"08:15\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 55m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"2\",\"flightno\":\"5379\",\"destination\":\"BOM\",\"FlHash\":\"r6E-5379\",\"stops\":\"0\",\"seatsavailable\":\"10\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8587.978,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 55m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0815\",\"arrtime\":\"11:10\",\"arrdate\":\"2020-10-03t1110\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "5379",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "11:10",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "10:55",
             "arrTime": "13:40",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"429\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"10:55\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 45m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"429\",\"destination\":\"BOM\",\"FlHash\":\"r6E-429\",\"stops\":\"0\",\"seatsavailable\":\"10\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8569.555,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 45m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1055\",\"arrtime\":\"13:40\",\"arrdate\":\"2020-10-03t1340\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "429",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "13:40",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "15:00",
             "arrTime": "17:40",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"5353\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"15:00\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 40m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"2\",\"flightno\":\"5353\",\"destination\":\"BOM\",\"FlHash\":\"r6E-5353\",\"stops\":\"0\",\"seatsavailable\":\"10\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8565.418,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 40m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1500\",\"arrtime\":\"17:40\",\"arrdate\":\"2020-10-03t1740\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "5353",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "17:40",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "16:00",
             "arrTime": "18:45",
             "fare": 11206,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"5342\",\"Group\":\"\",\"farebasis\":\"E0IP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"16:00\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 45m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"2\",\"flightno\":\"5342\",\"destination\":\"BOM\",\"FlHash\":\"r6E-5342\",\"stops\":\"0\",\"seatsavailable\":\"10\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":20801.256,\"PromotionId\":\"\",\"fare\":{\"grossamount\":11206,\"totalbasefare\":9349,\"adultbasefare\":9349,\"totalfare\":11206,\"totalsurcharge\":0,\"adulttotalfare\":11206,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 45m\",\"searchKey\":\"0:0:0:0:0:9349:0:11206:0:0:0:0:0:0:0:0:11206:9349:11206:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1600\",\"arrtime\":\"18:45\",\"arrdate\":\"2020-10-03t1845\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "5342",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "18:45",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "19:20",
             "arrTime": "22:15",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"115\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"19:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 55m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"115\",\"destination\":\"BOM\",\"FlHash\":\"r6E-115\",\"stops\":\"0\",\"seatsavailable\":\"40\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8587.978,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 55m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1920\",\"arrtime\":\"22:15\",\"arrdate\":\"2020-10-03t2215\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "115",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "22:15",
             "onwardflights": null
           },
           {
             "stops": 0,
             "airline": "IndiGo",
             "depTime": "21:40",
             "arrTime": "00:30",
             "fare": 7637,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"961\",\"Group\":\"\",\"farebasis\":\"N0IP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"21:40\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"2h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"961\",\"destination\":\"BOM\",\"FlHash\":\"r6E-961\",\"stops\":\"0\",\"seatsavailable\":\"8\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":8574.84,\"PromotionId\":\"\",\"fare\":{\"grossamount\":7637,\"totalbasefare\":5950,\"adultbasefare\":5950,\"totalfare\":7637,\"totalsurcharge\":0,\"adulttotalfare\":7637,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 50m\",\"searchKey\":\"0:0:0:0:0:5950:0:7637:0:0:0:0:0:0:0:0:7637:5950:7637:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t2140\",\"arrtime\":\"00:30\",\"arrdate\":\"2020-10-04t0030\",\"TravelTime\":\"\",\"onwardflights\":[]}",
             "flightNo": "961",
             "origin": "CCU",
             "destination": "BOM",
             "finalArrivalTime": "00:30",
             "onwardflights": null
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "07:00",
             "arrTime": "07:55",
             "fare": 5694,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"375\",\"Group\":\"\",\"farebasis\":\"L015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"07:00\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"4h 0m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"375\",\"destination\":\"BBI\",\"FlHash\":\"r6E-375_6E-375\",\"stops\":\"1\",\"seatsavailable\":\"49\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38277.99,\"PromotionId\":\"\",\"fare\":{\"grossamount\":5694,\"totalbasefare\":4049,\"adultbasefare\":4049,\"totalfare\":5694,\"totalsurcharge\":0,\"adulttotalfare\":5694,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"0h 55m\",\"searchKey\":\"0:0:0:0:0:4049:0:5694:0:0:0:0:0:0:0:0:5694:4049:5694:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0700\",\"arrtime\":\"07:55\",\"arrdate\":\"2020-10-03t0755\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"BBI\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"L015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"deptime\":\"08:25\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"375\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"49\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"2h 35m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0825\",\"arrtime\":\"11:00\",\"arrdate\":\"2020-10-03t1100\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "375",
             "origin": "CCU",
             "destination": "BBI",
             "finalArrivalTime": "11:00",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "08:25",
                 "arrTime": "11:00",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "375",
                 "origin": "BBI",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "18:20",
             "arrTime": "20:15",
             "fare": 6954,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"404\",\"Group\":\"\",\"farebasis\":\"O08AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"18:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"3h 55m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"404\",\"destination\":\"NAG\",\"FlHash\":\"r6E-404_6E-404\",\"stops\":\"1\",\"seatsavailable\":\"5\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38842.562,\"PromotionId\":\"\",\"fare\":{\"grossamount\":6954,\"totalbasefare\":5249,\"adultbasefare\":5249,\"totalfare\":6954,\"totalsurcharge\":0,\"adulttotalfare\":6954,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"1h 55m\",\"searchKey\":\"0:0:0:0:0:5249:0:6954:0:0:0:0:0:0:0:0:6954:5249:6954:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1820\",\"arrtime\":\"20:15\",\"arrdate\":\"2020-10-03t2015\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"NAG\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"O08AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"20:45\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"404\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"5\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"1h 30m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t2045\",\"arrtime\":\"22:15\",\"arrdate\":\"2020-10-03t2215\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "404",
             "origin": "CCU",
             "destination": "NAG",
             "finalArrivalTime": "22:15",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "20:45",
                 "arrTime": "22:15",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "404",
                 "origin": "NAG",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "05:45",
             "arrTime": "08:00",
             "fare": 3900,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"788\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"05:45\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 50m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"788\",\"destination\":\"HYD\",\"FlHash\":\"r6E-788_6E-608\",\"stops\":\"1\",\"seatsavailable\":\"29\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38339.723,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3900,\"totalbasefare\":2141,\"adultbasefare\":2141,\"totalfare\":3900,\"totalsurcharge\":0,\"adulttotalfare\":3900,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 15m\",\"searchKey\":\"0:0:0:0:0:2141:0:3900:0:0:0:0:0:0:0:0:3900:2141:3900:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0545\",\"arrtime\":\"08:00\",\"arrdate\":\"2020-10-03t0800\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"09:50\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"608\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"29\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"1h 45m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0950\",\"arrtime\":\"11:35\",\"arrdate\":\"2020-10-03t1135\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "788",
             "origin": "CCU",
             "destination": "HYD",
             "finalArrivalTime": "11:35",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "09:50",
                 "arrTime": "11:35",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "608",
                 "origin": "HYD",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "09:00",
             "arrTime": "11:15",
             "fare": 3900,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"6513\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"09:00\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"4h 45m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"6513\",\"destination\":\"HYD\",\"FlHash\":\"r6E-6513_6E-342\",\"stops\":\"1\",\"seatsavailable\":\"28\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38110.535,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3900,\"totalbasefare\":2141,\"adultbasefare\":2141,\"totalfare\":3900,\"totalsurcharge\":0,\"adulttotalfare\":3900,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 15m\",\"searchKey\":\"0:0:0:0:0:2141:0:3900:0:0:0:0:0:0:0:0:3900:2141:3900:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t0900\",\"arrtime\":\"11:15\",\"arrdate\":\"2020-10-03t1115\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"12:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"342\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"28\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"1h 25m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1220\",\"arrtime\":\"13:45\",\"arrdate\":\"2020-10-03t1345\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "6513",
             "origin": "CCU",
             "destination": "HYD",
             "finalArrivalTime": "13:45",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "12:20",
                 "arrTime": "13:45",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "342",
                 "origin": "HYD",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "14:55",
             "arrTime": "17:10",
             "fare": 3900,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"378\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"14:55\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"4h 40m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"378\",\"destination\":\"HYD\",\"FlHash\":\"r6E-378_6E-5376\",\"stops\":\"1\",\"seatsavailable\":\"26\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38097.207,\"PromotionId\":\"\",\"fare\":{\"grossamount\":3900,\"totalbasefare\":2141,\"adultbasefare\":2141,\"totalfare\":3900,\"totalsurcharge\":0,\"adulttotalfare\":3900,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 15m\",\"searchKey\":\"0:0:0:0:0:2141:0:3900:0:0:0:0:0:0:0:0:3900:2141:3900:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1455\",\"arrtime\":\"17:10\",\"arrdate\":\"2020-10-03t1710\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"18:05\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"2\",\"flightno\":\"5376\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"26\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"1h 30m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1805\",\"arrtime\":\"19:35\",\"arrdate\":\"2020-10-03t1935\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "378",
             "origin": "CCU",
             "destination": "HYD",
             "finalArrivalTime": "19:35",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "18:05",
                 "arrTime": "19:35",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "5376",
                 "origin": "HYD",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "19:55",
             "arrTime": "22:10",
             "fare": 4211,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"725\",\"Group\":\"\",\"farebasis\":\"Q015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"19:55\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 45m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"725\",\"destination\":\"HYD\",\"FlHash\":\"r6E-725_6E-263\",\"stops\":\"1\",\"seatsavailable\":\"30\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38328.99,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4211,\"totalbasefare\":2436,\"adultbasefare\":2436,\"totalfare\":4211,\"totalsurcharge\":0,\"adulttotalfare\":4211,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 15m\",\"searchKey\":\"0:0:0:0:0:2436:0:4211:0:0:0:0:0:0:0:0:4211:2436:4211:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t1955\",\"arrtime\":\"22:10\",\"arrdate\":\"2020-10-03t2210\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"00:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"263\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"30\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"1h 20m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-04t0020\",\"arrtime\":\"01:40\",\"arrdate\":\"2020-10-04t0140\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "725",
             "origin": "CCU",
             "destination": "HYD",
             "finalArrivalTime": "01:40",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "00:20",
                 "arrTime": "01:40",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "263",
                 "origin": "HYD",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           },
           {
             "stops": 1,
             "airline": "IndiGo",
             "depTime": "23:20",
             "arrTime": "01:25",
             "fare": 4211,
             "flightData": "{\"origin\":\"CCU\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"946\",\"Group\":\"\",\"farebasis\":\"Q015AP\",\"depterminal\":\"1\",\"holdflag\":\"\",\"CINFO\":\"air-CCU-BOM-20201003--1-0-0-E-100--\",\"deptime\":\"23:20\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"5h 35m\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"-\",\"flightno\":\"946\",\"destination\":\"HYD\",\"FlHash\":\"r6E-946_6E-428\",\"stops\":\"1\",\"seatsavailable\":\"30\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":38288.273,\"PromotionId\":\"\",\"fare\":{\"grossamount\":4211,\"totalbasefare\":2436,\"adultbasefare\":2436,\"totalfare\":4211,\"totalsurcharge\":0,\"adulttotalfare\":4211,\"totalcommission\":\"\"},\"CabinClass\":\"\",\"warnings\":\"Refundable\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"seatingclass\":\"E\",\"operatingcarrier\":\"\",\"src\":\"\",\"CacheKey\":\"CCUBOM20201003E6E\",\"splitduration\":\"2h 5m\",\"searchKey\":\"0:0:0:0:0:2436:0:4211:0:0:0:0:0:0:0:0:4211:2436:4211:0:0:0:0:0:0\",\"bookingclass\":\"\",\"SetTime\":\"2020-04-12 13:57:02\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-03t2320\",\"arrtime\":\"01:25\",\"arrdate\":\"2020-10-04t0125\",\"TravelTime\":\"\",\"onwardflights\":[{\"origin\":\"HYD\",\"rating\":0,\"DepartureTime\":\"\",\"flightcode\":\"\",\"Group\":\"\",\"farebasis\":\"R015AP\",\"depterminal\":\"-\",\"holdflag\":\"\",\"deptime\":\"03:40\",\"codeshare\":\"\",\"ibibopartner\":\"indigonew\",\"duration\":\"\",\"platingcarrier\":\"\",\"qtype\":\"\",\"arrterminal\":\"1\",\"flightno\":\"428\",\"destination\":\"BOM\",\"FlHash\":\"\",\"stops\":\"\",\"seatsavailable\":\"30\",\"carrierid\":\"6E\",\"airline\":\"IndiGo\",\"FilteringValue\":0.0,\"provider\":\"\",\"BookabilityValue\":0.0,\"PromotionId\":\"\",\"fare\":{\"grossamount\":0,\"totalbasefare\":0,\"adultbasefare\":0,\"totalfare\":0,\"totalsurcharge\":0,\"adulttotalfare\":0,\"totalcommission\":\"0\"},\"CabinClass\":\"\",\"warnings\":\"\",\"ArrivalTime\":\"\",\"aircraftType\":\"320\",\"operatingcarrier\":\"\",\"src\":\"\",\"splitduration\":\"1h 15m\",\"bookingclass\":\"\",\"DataSource\":\"indigonew\",\"multicitysearch\":\"\",\"depdate\":\"2020-10-04t0340\",\"arrtime\":\"04:55\",\"arrdate\":\"2020-10-04t0455\",\"TravelTime\":\"\",\"onwardflights\":[]}]}",
             "flightNo": "946",
             "origin": "CCU",
             "destination": "HYD",
             "finalArrivalTime": "04:55",
             "onwardflights": [
               {
                 "stops": 0,
                 "airline": null,
                 "depTime": "03:40",
                 "arrTime": "04:55",
                 "fare": 0,
                 "flightData": null,
                 "flightNo": "428",
                 "origin": "HYD",
                 "destination": "BOM",
                 "finalArrivalTime": null,
                 "onwardflights": null
               }
             ]
           }
         ]
       } 
     };


     this.getFlightData = flightDa.flightResponse.onwardflights;
     /// sort onwardflights
     this.getFlightData.sort(function(x,y){
      return x.fare - y.fare
     });
     this.returnflights = flightDa.flightResponse.returnflights;
     /// sort returnflights
     this.returnflights.sort(function(x,y){
      return x.fare - y.fare
     });


    //   this._createTripService.getFlightList(this.token,this.emailId,searchVal).subscribe((res: any) => {
    //   console.log(res);
    //   this.getFlightData = res.flightResponse.onwardflights;
    //   this.returnflights = res.flightResponse.returnflights;
    //     /***** sort onwardflights ********/
    //     this.getFlightData.sort(function(x,y){
    //       return x.fare - y.fare
    //     });
    //     this.returnflights = flightDa.flightResponse.returnflights;
    //     /// sort returnflights
    //     this.returnflights.sort(function(x,y){
    //       return x.fare - y.fare
    //     });  
    // });

   } 
  
  }


  flightSort(fieldsort,sorttype){
    console.log('call');
    console.log('this.fareSort',this.fareSort);
    if(fieldsort === 'fare'){
        this.fareSort = sorttype;
        this.arrivalSort = '';
        this.timeSort = '';
        this.deparSort = '';
        this.sortFlightData(fieldsort,sorttype);
    } else if(fieldsort === 'depTime'){
        this.fareSort = '';
        this.arrivalSort = '';
        this.timeSort = '';
        this.deparSort = sorttype;
        this.sortFlightData(fieldsort,sorttype);
    } else if(fieldsort === 'finalArrivalTime'){
        this.fareSort = '';
        this.arrivalSort = '';
        this.timeSort = sorttype;
        this.deparSort = '';
        this.sortFlightData(fieldsort,sorttype);
    } else if(fieldsort === 'arrTime'){
        this.fareSort = '';
        this.arrivalSort = sorttype;
        this.timeSort = '';
        this.deparSort = '';
        this.sortFlightData(fieldsort,sorttype);
    }
    
  }

  sortFlightData(fieldsort,sortType){
    if(sortType === 'D'){
      this.getFlightData.sort(function(x,y){
        return y[fieldsort] - x[fieldsort]
       });

       this.returnflights.sort(function(x,y){
        return y[fieldsort] - x[fieldsort]
       });
    } else if(sortType === 'A'){
      this.getFlightData.sort(function(x,y){
        return x[fieldsort] - y[fieldsort]
       });
      this.returnflights.sort(function(x,y){
        return x[fieldsort] - y[fieldsort]
      });
    }
  }


  selectFlight(i,airline,flightNo,depTime,origin,stops,arrTime,destination,fare){
    if(this.flightSelectedStatus){
       this.flightSelectedStatus = false;
       let getSlData = [];
       getSlData = this.selectedFlight.filter(slEle => slEle.travelType == 'O' && slEle.selectionType == 'S');
       console.log('filter data',getSlData);
       let preIndex = getSlData[0].selectedIndex;
       if(this.flightTripType === '1'){
        document.getElementById("airDiv"+preIndex).style.borderColor = "";
        document.getElementById("selectIco"+preIndex).style.display = "none";
        document.getElementById("reasonMainDiv"+preIndex).style.display = "none";
       } else if(this.flightTripType === '2') {
        document.getElementById("onWardDiv"+preIndex).style.borderColor = "";
        document.getElementById("selectOnwardIco"+preIndex).style.display = "none";
        document.getElementById("reasonDiv"+preIndex).style.display = "none";
       }
       
       let indexNo = this.selectedFlight.findIndex(slEle => slEle.travelType === 'O' && slEle.selectionType === 'S');
       console.log('indexNo',indexNo);
       this.selectedFlight.splice(indexNo, 1);
       //this.selectedFlight = this.selectedFlight.filter(slEle => slEle.travelType !== 'O' && slEle.selectionType !== 'S');
    }

  if(!this.flightSelectedStatus){ 
    this.flightSelectedStatus = true;

    if(this.flightTripType === '1'){
      document.getElementById("airDiv"+i).style.borderColor = "red";
      document.getElementById("selectIco"+i).style.display = "";
      if(i>0){
        document.getElementById("reasonMainDiv"+i).style.display = ""; 
       }
    } else if(this.flightTripType === '2'){
      document.getElementById("onWardDiv"+i).style.borderColor = "red";
      document.getElementById("selectOnwardIco"+i).style.display = "";
      if(i>0){
        document.getElementById("reasonDiv"+i).style.display = ""; 
       }
    }
    
    
    
       

    this.selectedFlight.push({
            "bookingType":"1",
            "tripId": this.tripId,
            "flightTrainNumber": flightNo,
            "flightTrainName": airline,
            "amount": fare,
            "fromLocation": origin,
            "toLocation": destination,
            "ticketClass": "Business",
            "tripType": "One-Way",
            "timeOfTravel":"12-05-2020",
            "selectedIndex":i,
            "selectionType": 'S', // S/C
            "travelType":'O',
            "depTime":depTime,
            "arrTime":arrTime,
            "stops":stops
      });
    }
  }

  selectFlightReturn(i,airline,flightNo,depTime,origin,stops,arrTime,destination,fare){
    console.log('return');
    console.log('this.flightSelectedRetrunStatus',this.flightSelectedRetrunStatus);
    if(this.flightSelectedRetrunStatus){
       this.flightSelectedRetrunStatus = false;
       let getSlData2 = [];
       getSlData2 = this.selectedFlight.filter(slEle => slEle.travelType == 'R' && slEle.selectionType == 'S');
       let preIndex = getSlData2[0].selectedIndex;
       document.getElementById("returnDiv"+preIndex).style.borderColor = "";
       document.getElementById("selectReturnIco"+preIndex).style.display = "none"; 
       document.getElementById("reasonReturnDiv"+preIndex).style.display = "none"; 
       

       let indexNo = this.selectedFlight.findIndex(slEle => slEle.travelType === 'R' && slEle.selectionType === 'S');
       console.log('indexNo',indexNo);
       this.selectedFlight.splice(indexNo, 1);
     }

    if(!this.flightSelectedRetrunStatus){ 
        this.flightSelectedRetrunStatus = true;
        document.getElementById("returnDiv"+i).style.borderColor = "red";
        document.getElementById("selectReturnIco"+i).style.display = "";
       if(i>0){ 
        document.getElementById("reasonReturnDiv"+i).style.display = ""; 
       }

        this.selectedFlight.push({
                "bookingType":"1",
                "tripId": this.tripId,
                "flightTrainNumber": flightNo,
                "flightTrainName": airline,
                "amount": fare,
                "fromLocation": origin,
                "toLocation": destination,
                "ticketClass": "Business",
                "tripType": "One-Way",
                "timeOfTravel":"12-05-2020",
                "selectedIndex":i,
                "selectionType": 'S', // S/C
                "travelType": 'R',
                "depTime":depTime,
                "arrTime":arrTime,
                "stops":stops
          });
      }   
  }


  selectHotel(i,hotelName,amenities,guestRating,hotelPrice,imageUrl){

    console.log('amenities',amenities);
    // console.log('this.hotelSelectedStatus',this.hotelSelectedStatus);
    if(this.hotelSelectedStatus){
       this.hotelSelectedStatus = false;
       let hotelData = [];
       hotelData = this.selectedHotel.filter(slEle => slEle.selectionType == 'S');
       let preIndex = hotelData[0].selectedIndex;
      
      document.getElementById("hotelDiv"+preIndex).style.borderColor = "";
      document.getElementById("selectHotelIco"+preIndex).style.display = "none";
      document.getElementById("reasonMainHotelDiv"+preIndex).style.display = "none";
       

       let indexNo = this.selectedHotel.findIndex(slEle => slEle.selectionType === 'S');
       console.log('indexNo',indexNo);
       this.selectedHotel.splice(indexNo, 1);
     }

    if(!this.hotelSelectedStatus){ 
        this.hotelSelectedStatus = true;
        document.getElementById("hotelDiv"+i).style.borderColor = "red";
        document.getElementById("selectHotelIco"+i).style.display = "";
       if(i>0){ 
        document.getElementById("reasonMainHotelDiv"+i).style.display = "";
       }


        this.selectedHotel.push({
            "bookingType":"1",
            "tripId":this.tripId,
            "hotelGuesthouseName": hotelName,
            "hSNCode":"we345",
            "amount": hotelPrice,
            "checkInTime":"10:12",
            "checkOutTime":"12",
            "selectedIndex":i,
            "selectionType": 'S', // S/C
            "hotelImage": imageUrl,
            "amenities": amenities,
            "guestRating":guestRating,
            "reason": ''
           });

           console.log('selected hotel',this.selectedHotel);
      }
  }

  getReasonHotel(indexHotel){
    console.log('indexhotel',indexHotel);
    console.log('selectReasonHotel',this.selectReasonHotel);
    let getHotelData = this.selectedHotel.filter(ele => ele.selectedIndex === indexHotel)
    getHotelData[0].reason = this.selectReasonHotel;
  }


  getHotel(){
    if(!this.starRating || !this.userRating){
      this.starRating = false;
      this.userRating = false;
      return
    } else {
    let hotelSearchVal= {
      "queryData":{
      "cityId": this.toLocation,
      "checkInDate": "20200929",
      "checkOutDate": "20200930",
      "rooms":1,
      "guests":2
      
      },
      "customFilters":
      {
      "guestRating": this.userRating,
      "starRating": this.starRating
      
      }
      
      }


      const hotelRes = {
        "customHotelModel": [
          {
            "price": 500,
            "guestRating": 4.4,
            "starRating": 3,
            "type": [
              "Cottage"
            ],
            "imageUrl": "https://cdn1.goibibo.com/t_th_v3/musa-jungle-retreat-barpeta-1489664535938jpg-111954364910-oriwebp.jpg",
            "name": "Musa Jungle Retreat",
            "hotelData": "{\"gr\":4.4,\"prc\":2000,\"ch_code\":\"\",\"promo_apply\":1,\"ta_id\":\"\",\"room_count\":0,\"gstfriendly\":false,\"rowid\":\"\",\"gohtlid\":\"HTLGBO1000070542\",\"op_wt\":0.0,\"tbig\":\"https://cdn1.goibibo.com/t_r_v3/musa-jungle-retreat-barpeta-1489664535938jpg-111954364910-oriwebp.jpg\",\"vcid\":6050603804523780642,\"cn\":\"India\",\"lid\":\"\",\"h_sf\":\"\",\"egc\":0,\"ty\":\"gohomes\",\"ta_rcnt\":0,\"tp\":0.0,\"t\":\"https://cdn1.goibibo.com/t_srp_v5/musa-jungle-retreat-barpeta-1489664535938jpg-111954364910-oriwebp.jpg\",\"priority\":3,\"pa\":{\"Default\":0,\"v3\":1},\"fcdt\":\"\",\"lpg\":0,\"fwdp\":{},\"hotel_url\":\"\",\"_24hrs_check_in\":0,\"la\":26.6585197449,\"hr\":3,\"tp_alltax\":0.0,\"ta_rat\":0,\"ibp\":\"\",\"tmob\":\"https://cdn1.goibibo.com/t_th_v3/musa-jungle-retreat-barpeta-1489664535938jpg-111954364910-oriwebp.jpg\",\"hn\":\"Musa Jungle Retreat\",\"spf\":0,\"hc\":5723283569435040242,\"reco_per\":\"100\",\"c\":\"Barpeta\",\"pah_only\":0,\"l\":\"\",\"fl_rat\":3,\"gir_rcnt\":41,\"checkouttime\":\"1030\",\"mp\":0.0,\"lo\":91.0073013306,\"slot_booking\":0,\"checkintime\":\"1200\",\"mp_wt\":0.0,\"op\":0.0,\"ht\":[\"Cottage\"],\"fm\":[\"Outdoor Activities\",\"Restaurant/Coffee Shop\",\"Kitchen\",\"Parking Facility\",\"Dining\",\"Indoor Entertainment\",\"Power backup\",\"Laundry Service\"]}",
            "amenities": [
              "Outdoor Activities",
              "Restaurant/Coffee Shop",
              "Kitchen",
              "Parking Facility",
              "Dining",
              "Indoor Entertainment",
              "Power backup",
              "Laundry Service"
            ]
          },
          {
            "price": 2000,
            "guestRating": 3.5,
            "starRating": 3,
            "type": [
              "Hotel"
            ],
            "imageUrl": "https://cdn1.goibibo.com/t_th_v3/hotel-aatithya-barpeta-meeting-hall-150122706755-oriwebp.jpg",
            "name": "Hotel Aatithya",
            "hotelData": "{\"gr\":3.5,\"prc\":2000,\"ch_code\":\"\",\"promo_apply\":1,\"ta_id\":\"\",\"room_count\":20,\"gstfriendly\":false,\"rowid\":\"\",\"gohtlid\":\"HTLGBO1000040474\",\"op_wt\":0.0,\"tbig\":\"https://cdn1.goibibo.com/t_r_v3/hotel-aatithya-barpeta-meeting-hall-150122706755-oriwebp.jpg\",\"vcid\":6050603804523780642,\"cn\":\"India\",\"lid\":\"\",\"h_sf\":\"\",\"egc\":0,\"ty\":\"regular\",\"ta_rcnt\":0,\"tp\":0.0,\"t\":\"https://cdn1.goibibo.com/t_srp_v5/hotel-aatithya-barpeta-meeting-hall-150122706755-oriwebp.jpg\",\"priority\":4,\"pa\":{\"Default\":0,\"v3\":1},\"fcdt\":\"\",\"lpg\":0,\"fwdp\":{},\"hotel_url\":\"\",\"_24hrs_check_in\":0,\"la\":26.5043525696,\"hr\":3,\"tp_alltax\":0.0,\"ta_rat\":0,\"ibp\":\"\",\"tmob\":\"https://cdn1.goibibo.com/t_th_v3/hotel-aatithya-barpeta-meeting-hall-150122706755-oriwebp.jpg\",\"hn\":\"Hotel Aatithya\",\"spf\":0,\"hc\":3002373280348041983,\"reco_per\":\"100\",\"c\":\"Barpeta\",\"pah_only\":0,\"l\":\"\",\"fl_rat\":0,\"gir_rcnt\":2,\"checkouttime\":\"1200\",\"mp\":0.0,\"lo\":91.1847763062,\"slot_booking\":0,\"checkintime\":\"1200\",\"mp_wt\":0.0,\"op\":0.0,\"ht\":[\"Hotel\"],\"fm\":[\"Free Internet\",\"Laundry Service\",\"Restaurant/Coffee Shop\",\"Room Service\",\"Daily housekeeping\",\"Travel Assistance\"]}",
            "amenities": [
              "Free Internet",
              "Laundry Service",
              "Restaurant/Coffee Shop",
              "Room Service",
              "Daily housekeeping",
              "Travel Assistance"
            ]
          }
        ]
      };

      this.getHotelData = hotelRes.customHotelModel;
      this.getHotelData.sort(function(x,y){
        return x.price - y.price
       });

      // this._createTripService.getHotelList(this.token,this.emailId,hotelSearchVal).subscribe((res: any) => {
      //   console.log(res);
      //   this.getHotelData = res.flightResponse.onwardflights;
            // this.getHotelData = hotelRes.customHotelModel;
            // this.getHotelData.sort(function(x,y){
            //   return x.price - y.price
            // });
      // });

    }
                
    }

}