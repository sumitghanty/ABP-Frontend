import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from "ngx-smart-popover";
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travel-nav',
  templateUrl: './travel-nav.component.html',
  styleUrls: ['./travel-nav.component.scss'],
  providers: [NgbPopoverConfig]
})
export class TravelNavComponent implements OnInit {

  constructor(private router:Router,public _NgbPopoverConfig:NgbPopoverConfig) { 
    _NgbPopoverConfig.placement = 'bottom';
  }

  ngOnInit(): void {
  }

  logout(){
    //console.log('logout');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
