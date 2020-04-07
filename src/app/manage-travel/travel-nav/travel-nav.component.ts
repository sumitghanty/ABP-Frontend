import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-nav',
  templateUrl: './travel-nav.component.html',
  styleUrls: ['./travel-nav.component.scss']
})
export class TravelNavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    //console.log('logout');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
