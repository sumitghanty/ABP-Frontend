import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from "ngx-smart-popover";
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travel-nav',
  templateUrl: './travel-nav.component.html',
  styleUrls: ['./travel-nav.component.scss'],
  providers: [NgbPopoverConfig],
  styles: [`
    :host >>> .popover {
      color: #000;
      max-width: 22%;
    }`
  ]
})
export class TravelNavComponent implements OnInit {
  userFisrtname : any 
  userLastname : any 

  constructor(private router:Router,public _NgbPopoverConfig:NgbPopoverConfig) { 
    _NgbPopoverConfig.placement = 'bottom';
    _NgbPopoverConfig.popoverClass = 'otherCla';
  }

  ngOnInit() {
    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.userFisrtname = userLoginData.user.userFirstName;
    this.userLastname = userLoginData.user.userLastName;
    console.log('this.userFisrtname', userLoginData)
  }

  logout(){
    //console.log('logout');
    localStorage.clear();
    window.location.href = '/login';
    //this.router.navigate(['/login']);
  }

}
