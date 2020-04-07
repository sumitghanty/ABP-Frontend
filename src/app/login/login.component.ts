import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import {  GoogleLoginProvider,  AuthService,  SocialUser} from 'angular-6-social-login';
//import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { Socialusers } from '../shared/product';
import { SocialloginService } from '../service/sociallogin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  auth2: any;
  loginError: any;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  response;
  socialusers = new Socialusers();
  constructor(
    private authService: SocialloginService,
    private router: Router,
    private toastr: ToastrService
    //private authService: AuthService,
  //  private snackBar: MatSnackBar //private loginService: LoginService
  ) {}

  ngOnInit() {
    this.googleSDK();
  }
  signInWithGoogle(): void {
    /*this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(socialusers => {
        console.log(socialusers);
        this.Savesresponse(socialusers);
        //on success
        //this will return user data from google. What you need is a user token which you will send it to the server
        //this.sendToRestApiMethod(userData.idToken);
      });*/
    this.router.navigate(['/home']);
  }
  scrollToLogin() {
    const element = document.getElementById('target');
    element.scrollIntoView();
  }
  scrollTop() {
    const element = document.getElementById('content');
    element.scrollIntoView();
  }
  Savesresponse(socialusers: Socialusers) {
    this.authService.Savesresponse(socialusers).subscribe((res: any) => {
      debugger;
      console.log(res);
      this.socialusers = res;
      this.response = res.userDetail;
      localStorage.setItem('socialusers', JSON.stringify(this.socialusers));
      console.log(
        localStorage.setItem('socialusers', JSON.stringify(this.socialusers))
      );
      this.router.navigate([`/home`]);
    });
  }



  // gmail login

  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        const param = {userEmail: profile.getEmail()};
        //param.email =  profile.getEmail();
        this.authService.login(googleUser.getAuthResponse().id_token,param).subscribe(
            allData => {
              this.afterLogin(allData);
              // let userLoginData = info.;
              // localStorage.setItem("userLoginData", JSON.stringify(userLoginData));
              // if(userLoginData.login === null && userLoginData.responseCode === 201){

              // } else {

              // }
              // this.buttonDisabled = false;
              // const brandData = info.data;
              // sessionStorage.setItem('accessToken', brandData.accessToken);
              // this.store.dispatch(login({ brandData }));
              // this.loadBrandAdminData(info);
            },
            error => {
              console.log('error',error);
              // this.loading = false;
              // this.buttonDisabled = false;
              // this.alertService.error(error.error.message);
            }
          );
 
 
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }
  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '809727277112-rrij6hp6f78jpd9q2f7e8qr0c1q11v0o.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  afterLogin(getData){
    //console.log(getData.login);
    //console.log('call');
    this.toastr.success("Hello, I'm the toastr message.");
    if(getData && getData.login === null && getData.responseCode === 201){
      this.loginError = getData.responseMessage;
      //this.loginError.status = true;
      console.log('not login');
    } else if(getData && getData.login && getData.user) {
      //this.loginError.status = false;
      //console.log('login');
      let userLoginData = getData;
      localStorage.setItem("userLoginData", JSON.stringify(userLoginData));
      localStorage.setItem("homeTilesData", JSON.stringify(getData.tileMaster));
      localStorage.setItem("homeTilesData", getData.tileMaster);
      this.router.navigate(['/managetravel/dashboard']);
    }
  }

}


