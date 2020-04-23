import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TravellerModalComponent } from './traveller-modal/traveller-modal.component';
import { CreateTripService } from './../../core/service/create-trip.service';
import {MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { TripInformation } from './../../core/do-model/trip-information';
import { CreateTripFuncComponent } from './create-trip-func.component';
import { CustomDateParserFormatter,CustomAdapter } from './date-custom.component';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: CreateTripFuncComponent}
  ]
})
export class CreateTripComponent implements OnInit {

    frmTravellerInformation: FormGroup;
    _tripInformation: TripInformation = {} as TripInformation;
  
    // traveller varriable
    getCity : any; token: any; emailId: any; userDet: any; userId: any; allTravellerList:any;tripFromLocation:any;tripToLocation:any;
    tripType:any; departtureTime:any; arrivalTime:any; travelStop:any;

   // flight varriable
    getFlightData:any; returnflights: any; onwardFlightLowestPrice: any; returnFlightLowestPrice: any; getHotelData:any; tripId:any;
    tripDet:any; selectedFlight = []; selectedHotel = []; flightSelectedStatus = false; flightSelectedRetrunStatus = false;
    fromAirportCity: any; toAirportCity: any; fareSort = 'A';arrivalSort = ''; timeSort = ''; deparSort = ''; flightTripType = ''; reasonSelectFlight: any; flightSearchStartDate : any; flightSearchEndDate : any; fromCityName : any; toCityName : any;
    
    //hotel varriable
    starRating: any; userRating: any; hotelMeal: any; hotelLocality: any;hotelName: any;hotelRooms: any;checkInDate: any;checkOutDate: any;selectReasonHotel: any;testmodel: NgbDateStruct;itaCityMaster: any;hotelLowestPrice: any;
    poolService: any;
    hotelSelectedStatus = false;

    config_city = {
      displayKey: 'cityName', // if objects array passed which key to be displayed defaults to description
      search: true,
      height: '200px',
      placeholder: 'Select',
      limitTo: 0
    };
    config_itaCity = {
      displayKey: 'city', // if objects array passed which key to be displayed defaults to description
      search: true,
      height: '200px',
      placeholder: 'Select',
      limitTo: 0
    };

    model2: string;
    @ViewChild('stepper') private myStepper: MatStepper;
    totalStepsCount: number;
    stepStatus = 1;

  constructor(
    public dialog: MatDialog,
    public _createTripService: CreateTripService,
    public _createTripFuncComponent: CreateTripFuncComponent,
    private formBuilder:FormBuilder,
    private datePipe: DatePipe,
    private router: Router 
  ) {
     /******** Data get from traveller modal *********/
      this._createTripService.dataString$.subscribe(
        data => {
            this.allTravellerList = data;
        });
    /********End Data get from traveller modal *********/    
   }

  ngOnInit() {
    
    this.frmTravellerInformation = this.formBuilder.group({
      travelType: ['', Validators.required], wayType: ['', Validators.required],fromLocation: ['', Validators.required], toLocation: ['', Validators.required],
      startDate: ['', Validators.required], endDate: ['', Validators.required], purpose: ['', Validators.required],tripFor: ['', Validators.required],
      travelDetails: [''], tripCostCenter: [''],eventCode: [''] });

    /// data get from localstorage
    this.allTravellerList =  JSON.parse(localStorage.getItem('userAllList'));
    this._tripInformation.purpose = ''; this._tripInformation.tripFor = ''; this.departtureTime = ''; this.arrivalTime = ''; this.travelStop = '';
    this.starRating = ''; this.userRating = ''; this.hotelMeal = ''; this.hotelLocality = ''; this.hotelName = ''; this.hotelRooms = '';
    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.getCity = userLoginData.masterResponseModel.cityMaster;
    this._tripInformation.purposeMaster = userLoginData.masterResponseModel.purposeMaster
    this._tripInformation.tripForMaster = userLoginData.masterResponseModel.tripForMaster
    this._tripInformation.costCenter = userLoginData.masterResponseModel.costCenter
    this._tripInformation.eventMaster = userLoginData.masterResponseModel.eventMaster
    this.itaCityMaster = userLoginData.masterResponseModel.domesticIataMapping;
    this.emailId = userLoginData.login.userEmail;
    this.token = userLoginData.login.generatedToken;
    this.userId = userLoginData.login.userId;
    this.tripFromLocation = localStorage.getItem('tripFromLocation');
    this.tripToLocation = localStorage.getItem('tripToLocation');
  }
 
  /*************** tab view related function *******************/
    // Event fired after view is initialized
    ngAfterViewInit() {
      this.totalStepsCount = this.myStepper._steps.length;
    }
  
    setTabIndex(events){
      this.stepStatus = events.selectedIndex+2;
    }
    
    goBack(stepper: MatStepper) {
      this.stepStatus--;
      stepper.previous();
    }
  /****************End tab view related function ****************/

  /***************** Traveller Model  Open *****************/
  openDialog(): void {
    const dialogRef = this.dialog.open(TravellerModalComponent, {
      width: '35%',
      height: 'auto',
      data: 'test'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  /***************** End Traveller Model Open*****************/

  /*********** delete traveller from list ***********************/
  deleteTraveller(indexNo){
    this.allTravellerList.splice(indexNo, 1);
    localStorage.setItem('userAllList',JSON.stringify(this.allTravellerList));
  }
  /*********** delete traveller from list *************************/
  
  /************traveller detail div open & close **************************/
  travDetDivOpen(inumber,travType){
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
  /************end traveller detail div open & close ***********************/
  /**********I* validaton function *************************/
  get TravellerInformationFromControl() {
    return this.frmTravellerInformation.controls;
  }
  /************ end validaton function ***********/
  /*****************************create trip *************************/
  async saveTrip(stepper: MatStepper){
      /* form validation check */
      this.flightSearchStartDate = this._createTripFuncComponent.dateConvert(this._tripInformation.startDate);
      this.flightSearchEndDate = this._createTripFuncComponent.dateConvert(this._tripInformation.endDate);
      //var newdate = this._tripInformation.startDate.split("-").reverse().join("");
      if(this.frmTravellerInformation.invalid){
        return;
      }
      this.flightTripType = this._tripInformation.wayType;
      /* end form validation check */
      let getSaveBody = await this._createTripFuncComponent.save(this._tripInformation,this.token,this.emailId,this.userId,this.stepStatus,this.tripFromLocation,this.tripToLocation);
      this._createTripService.tripSave(this.emailId,this.token,getSaveBody).subscribe((res: any) => {
        localStorage.setItem('getTripData',res);
        this.tripDet = res.tripcreation;
      });
      this.tripFromLocation = this.fromCityName;
      this.tripToLocation = this.toCityName;
      let purposeSelectedArr = this._tripInformation.purposeMaster.filter(ele => ele.purposeId == this._tripInformation.purpose);
      this._tripInformation.purposeDesc = purposeSelectedArr[0].purposeDescription;
      let tipForArr = this._tripInformation.tripForMaster.filter(ele => ele.tripForMasterId == this._tripInformation.tripFor);
      this._tripInformation.tripForMasterDesc = tipForArr[0].tripForMasterDescription;
      stepper.next();
  }
  /*****************************End create trip *************************/

  /***************************** update trip ********************************/
  async updateTrip(stepper: MatStepper,saveType){
    let getUpdateTripData = await this._createTripFuncComponent.updateBody(this.tripDet,this.selectedFlight,this.selectedHotel,saveType,this.emailId);
    this._createTripService.tripUpdate(this.emailId,this.token,getUpdateTripData).subscribe((res: any) => {
      console.log(res);
      this.stepStatus++;
      if(saveType === 0){
        stepper.next();
      } else if(saveType === 1) {
        console.log('final submit');
        this.router.navigate(['/managetravel/tripList']);
      }
    });
  }
  /******************************* End update trip *******************************/

  /**************************** flight search ***********************************/
    async getFlight(){
      let getSearchFlightData = await this._createTripFuncComponent.searchFlight(this.emailId,this.token,this.fromAirportCity,this.toAirportCity,this.travelStop,this.flightSearchStartDate,this.flightSearchEndDate);

      this._createTripService.getFlightList(this.token,this.emailId,getSearchFlightData).subscribe((res: any) => {
        this.getFlightData = res.flightResponse.onwardflights;
        this.returnflights = res.flightResponse.returnflights;
        /***** sort onwardflights ********/
        this.getFlightData.sort(function(x,y){
          return x.fare - y.fare
        });
        /// sort returnflights
        this.returnflights.sort(function(x,y){
          return x.fare - y.fare
        });  
        this.onwardFlightLowestPrice = this.getFlightData[0].fare;
        this.returnFlightLowestPrice = this.returnflights[0].fare;
      });
    }

  /****************** sort flight data **********************/  
    flightSort(fieldsort,sorttype){
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
  
    /*********** Onward flight select and push in array ****************/
    selectFlight(i,airline,flightNo,depTime,origin,stops,arrTime,destination,fare){
      if(this.flightSelectedStatus){
         this.flightSelectedStatus = false;
         let getSlData = [];
         getSlData = this.selectedFlight.filter(slEle => slEle.travelType == 'O' && slEle.selectionType == 'S');
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
              "tripType": this.flightTripType, //"One-Way",
              "timeOfTravel": this._tripInformation.startDate,
              "selectedIndex":i,
              "selectionType": 'S', // S/C
              "travelType":'O', // origin or retrun
              "depTime":depTime,
              "arrTime":arrTime,
              "stops":stops,
              "reason":''
        });
      }
    }
  
    /****************************** return flight select  and push in array *****************/
    selectFlightReturn(i,airline,flightNo,depTime,origin,stops,arrTime,destination,fare){
      if(this.flightSelectedRetrunStatus){
         this.flightSelectedRetrunStatus = false;
         let getSlData2 = [];
         getSlData2 = this.selectedFlight.filter(slEle => slEle.travelType == 'R' && slEle.selectionType == 'S');
         let preIndex = getSlData2[0].selectedIndex;
         document.getElementById("returnDiv"+preIndex).style.borderColor = "";
         document.getElementById("selectReturnIco"+preIndex).style.display = "none"; 
         document.getElementById("reasonReturnDiv"+preIndex).style.display = "none"; 
         
  
         let indexNo = this.selectedFlight.findIndex(slEle => slEle.travelType === 'R' && slEle.selectionType === 'S');
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
                  "tripType": this.flightTripType, //"One-Way",
                  "timeOfTravel":"12-05-2020",
                  "selectedIndex":i,
                  "selectionType": 'S', // S/C
                  "travelType": 'R',
                  "depTime":depTime,
                  "arrTime":arrTime,
                  "stops":stops,
                  "reason":''
            });
        }   
    }
    
    /********************** Hotel select and push in array ********************/
    selectHotel(i,hotelName,amenities,guestRating,hotelPrice,imageUrl){
      if(this.hotelSelectedStatus){
         this.hotelSelectedStatus = false;
         let hotelData = [];
         hotelData = this.selectedHotel.filter(slEle => slEle.selectionType == 'S');
         let preIndex = hotelData[0].selectedIndex;
        
        document.getElementById("hotelDiv"+preIndex).style.borderColor = "";
        document.getElementById("selectHotelIco"+preIndex).style.display = "none";
        document.getElementById("reasonMainHotelDiv"+preIndex).style.display = "none";
         
  
         let indexNo = this.selectedHotel.findIndex(slEle => slEle.selectionType === 'S');
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
        }
    }
  
    /********************* reason for selcet flight *************/
    getReasonFlight(indexFlight){
      console.log('indexFlight',indexFlight);
      let getFlightData = this.selectedFlight.filter(ele => ele.selectedIndex === indexFlight)
      console.log('getFlightData',getFlightData);
      getFlightData[0].reason = this.reasonSelectFlight;
    }
  
    /******************** reason for select hotel ***************/
    getReasonHotel(indexHotel){
      let getHotelData = this.selectedHotel.filter(ele => ele.selectedIndex === indexHotel)
      getHotelData[0].reason = this.selectReasonHotel;
    }
  
  /******************* search hotel *********************************/
    getHotel(){
      let newCheckInDate = this._createTripFuncComponent.dateConvert(this.checkInDate);
      let newCheckOutDate = this._createTripFuncComponent.dateConvert(this.checkOutDate);
      
      if(!this.starRating || !this.userRating){
        this.starRating = false;
        this.userRating = false;
        return
      } else {

      let hotelSearchVal= {
        "queryData":{
        "cityId": this._tripInformation.toLocation,
        "checkInDate": newCheckInDate,
        "checkOutDate": newCheckOutDate,
        "rooms": this.hotelRooms,
        "guests":2
        },
        "customFilters":
        {
        "guestRating": this.userRating,
        "starRating": this.starRating
        
        }
        
        }
  
        this._createTripService.getHotelList(this.token,this.emailId,hotelSearchVal).subscribe((res: any) => {
          console.log(res);
               this.getHotelData = res.customHotelModel;
               this.getHotelData.sort(function(x,y){
                return x.price - y.price
               });
               this.hotelLowestPrice = this.getHotelData[0].price; 
        });
  
      }
                  
  }
  /****************** get city id and cityname from njx dropdown ************* */
  getLocationData(getData,type){
        if(type === 'fromLoc'){
          this._tripInformation.fromLocation = getData.value.cityid;
          this.fromCityName = getData.value.cityName;
        } else if(type === 'toLoc'){
          this._tripInformation.toLocation = getData.value.cityid;
          this.toCityName = getData.value.cityName;
        }
        else if(type === 'toItaLoc'){
          this.fromAirportCity = getData.value.iata;
        }
        else if(type === 'fromItaLoc'){
          this.toAirportCity = getData.value.iata;
        }
    }
    
}