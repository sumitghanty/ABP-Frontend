import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd  } from '@angular/router';
//import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TravelManagement';
   
   constructor(
    private router: Router
    //@Inject(SESSION_STORAGE) private storage: WebStorageService
  ){
    const loginData = localStorage.getItem('userLoginData');
    //console.log('loginData',loginData);

   

    
    // if (!selectedLanguage) {
    //   sessionStorage.setItem('selectedLanguage', 'en');
    //   this.translate.setDefaultLang('en');
    // } else {
    //   this.translate.setDefaultLang(selectedLanguage);
    // }
  }
}
