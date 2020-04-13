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
    selectedFlight:any;
    selectedHotel:any;

    test_form: any;

    @ViewChild('stepper') private myStepper: MatStepper;
    totalStepsCount: number;
    stepStatus = 1;

  constructor(
    public dialog: MatDialog,
    public _createTripService: CreateTripService,
    private formBuilder:FormBuilder
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
      travelDetails: ['', Validators.required],
      tripCostCenter: ['', Validators.required],
      eventCode: ['', Validators.required]
    });
    this.departtureTime = '';
    this.arrivalTime = '';
    this.travelStop = '';
    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.getCity = userLoginData.masterResponseModel.cityMaster;
    console.log('this.userLoginData',userLoginData);

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


  selectHotel(i){
    document.getElementById("hotelDiv"+i).style.borderColor = "red";
    this.selectedHotel.push({
        "bookingType":"1",
        "tripId":123,
        "hotelGuesthouseName":"ABC",
        "hSNCode":"we345",
        "amount":120,
        "checkInTime":"10:12",
        "checkOutTime":"12"
    })
  }

  selectFlight(i,airline,flightNo,depTime,origin,stops,arrTime,destination,fare){
    document.getElementById("airDiv"+i).style.borderColor = "red";
    document.getElementById("selectIco"+i).style.display = "";
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
          "timeOfTravel":"12-05-2020"
    })
  }

  save(stepper: MatStepper){
    //console.log('tripInfo------',this);
    if(this.frmTravellerInformation.invalid){
      return;
    }

    stepper.next();
    console.log('stepStatus',this.stepStatus);
    if(this.stepStatus === 1){
    localStorage.setItem('fromLocation',this.fromLocation);
    localStorage.setItem('toLocation',this.toLocation);
    this.tripFromLocation = this.fromLocation;
    this.tripToLocation = this.toLocation;
    let travelInfo = {
        domesticTravel: this.travelType,
        //internationalTravel: this.internationalTravel,
        oneWay: this.wayType,
        //roundWay: this.roundWay,
        fromLocation: this.fromLocation,
        toLocation: this.toLocation,
        startDate: this.startDate,
        endDate: this.endDate,
        purpose: this.purpose,
        tripFor: this.tripFor,
        travelDetails: this.travelDetails,
        tripCostCenter: this.tripCostCenter,
        eventCode: this.eventCode
    };
    console.log('this.userId',this.userId);
    let travelInfo2 = {
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
          "tripUserMapping":[{
          "passengerName":"33erty",
          "employeeId":1299

          },
          {
          "passengerName":"qwggty",
          "employeeId":2349

          }],


          "lineItemMaster":[{
          "lineItemtype":"2"
          }
          ]
      }
      this._createTripService.tripSave(this.emailId,this.token,travelInfo2).subscribe((res: any) => {
        console.log(res);
        this.tripId = res.tripid;
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
    let searchVal = {
        "queryData":{
          "source":"BOM",
          "destination":"CCU",
          "dateOfDeparture":"20200929",
          "dateOfArrival":"20201003",
          "adults":"1"
          
        },
        "customFilters":
        {
          "airline":"indigo",
          "stops":1
        }   
     }

     this._createTripService.getFlightList(this.token,this.emailId,searchVal).subscribe((res: any) => {
      console.log(res);
      this.getFlightData = res.flightResponse.onwardflights;
    });
  
  }



  getHotel(){
    let hotelSearchVal= {
        "queryData":{
          "cityId":"6050603804523780642",
        "checkInDate":"20200929",
        "checkOutDate":"20200930",
        "rooms":1,
        "guests":2
          
        },
        "customFilters":
        {
          "guestRating":5
          
        }
        
          
        }

        this._createTripService.getHotelList(this.token,this.emailId,hotelSearchVal).subscribe((res: any) => {
          console.log(res);
          this.getHotelData = res.flightResponse.onwardflights;
        });
                
    }

}