import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateTripService } from './../create-trip.service';
import { element } from 'protractor';

@Component({
  selector: 'app-traveller-modal',
  templateUrl: './traveller-modal.component.html',
  styleUrls: ['./traveller-modal.component.scss']
})
export class TravellerModalComponent implements OnInit {
  divType = 'E';
  userList: any;
  emailId: any;
  token: any;
  retainerList:any;
  employee: any;
  retainer: any;

  guestFirstName:any;
  guestLastName:any;
  guestGender:any;
  guestAge:any;
  guestEmailId:any;
  guestPhoneNo:any;
  guestOrgName:any;
  guestCostNo:any;
  guestEventNo:any;
  allTravellerList:any;

  constructor(
    public dialogRef: MatDialogRef<TravellerModalComponent>,
    public _createTripService: CreateTripService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
    //@Inject(MAT_DIALOG_DATA) public data: ModalData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(){
    console.log('test');
    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    console.log('this.userLoginData modal',userLoginData);
    this.emailId = userLoginData.login.userEmail;
    this.token = userLoginData.login.generatedToken;
    
    this._createTripService.getUserList(this.emailId,this.token).subscribe((res: any) => {
      console.log(res);
      this.userList = res;
    });
    
    this._createTripService.getRetainerList(this.emailId,this.token).subscribe((res: any) => {
      console.log(res);
      this.retainerList = res;
    });
  }


  showConDiv(types){
      this.divType = types;
  }

  popUpClose(){
    this.dialogRef.close();
  }

  dateSave(divType){
    console.log('test----',this.retainer);
    console.log('this.employee----',this.retainerList);
    //debugger
    let getEmp = this.userList.filter(element => element.userId == this.employee);
    console.log('getfil',getEmp);

    let getRet = this.retainerList.filter(element2 => element2.retainerId == this.retainer);
    console.log('getRet',getRet);

    let getGuest = {
      userFirstName: this.guestFirstName,
      userLastName: this.guestLastName,
      userEmailId: this.guestEmailId,
      userPhoneNumber: this.guestPhoneNo,
      age:this.guestAge,
      costCenterNo:this.guestCostNo,
      gender:this.guestGender,
      orgName:this.guestOrgName,
      eventNo:this.guestEventNo,
      type: 'G'
    }


    let userAllList = [];
    let userAllList2 = JSON.parse(localStorage.getItem('userAllList'))
    if(userAllList2){
      userAllList = userAllList2;
    }
    let userFromData : any;
    if(divType === 'E'){
       userFromData = getEmp[0];
    } else if(divType === 'R'){
       userFromData = getRet[0];
    } else if(divType === 'G'){
      userFromData = getGuest;
    }
    //userFromData = {'name': this.employee};
    console.log(userFromData);
    userAllList.push(userFromData);
    console.log('userAllList',userAllList);
    this._createTripService.saveData(userAllList) ; /// for listing
    localStorage.removeItem('userAllList');
    localStorage.setItem('userAllList',JSON.stringify(userAllList));

    console.log('localStorage.getItem',localStorage.getItem('userAllList'));


    // if(divType === 'G'){
    //   let guestUsetDet = {
    //         "userId": null,
    //         "userLocationID": null,
    //         "userCostcenterID": null,
    //         "userGoupId": null,
    //         "employeeCode": 13456,
    //         "userTitle": "",
    //         "userFirstName": this.guestFirstName,
    //         "userMiddleName": "",
    //         "userLastName": this.guestLastName,
    //         "userEmailId": this.guestEmailId,
    //         "userAddress": "",
    //         "userPin": "",
    //         "userPhoneNumber": this.guestPhoneNo,
    //         "userIsAllowedForTE": false,
    //         "userDOB": null,
    //         "gender": this.guestGender,
    //         "approver1": "",
    //         "approver2": null,
    //         "approver3": null,
    //         "createdBy": "11111",
    //         "createdDate": null,
    //         "updatedBy": null,
    //         "updatedDate": null,
    //         "userToRoleMapping": [
    //         {
    //             "userToRoleMappingId": 5,
    //             "roleId": 2,
    //             "createdBy": "11111",
    //             "createdDate": null,
    //             "updatedBy": null,
    //             "updatedDate": null,
    //             "userId": 0,
    //             "active": false
    //         },
    //         {
    //             "userToRoleMappingId": 6,
    //             "roleId": 3,
    //             "createdBy": "11111",
    //             "createdDate": null,
    //             "updatedBy": null,
    //             "updatedDate": null,
    //             "userId": 0,
    //             "active": false
    //         }
    //         ],
    //         "active": true,
    //         "approvalRequired": false
    //         }
    //     }
    //     this._createTripService.saveGuest(this.emailId,this.token).subscribe((res:any) => {
    //       console.log('res');
    //     });
          this.dialogRef.close();

      }
    

}
