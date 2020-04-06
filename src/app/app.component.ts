import { Component } from '@angular/core';
//import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TravelManagement';
   
   constructor(
    //@Inject(SESSION_STORAGE) private storage: WebStorageService
  ){
    const loginData = localStorage.getItem('userLoginData');
    console.log('loginData',loginData);
    // if (!selectedLanguage) {
    //   sessionStorage.setItem('selectedLanguage', 'en');
    //   this.translate.setDefaultLang('en');
    // } else {
    //   this.translate.setDefaultLang(selectedLanguage);
    // }
  }
}
