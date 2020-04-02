import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
//import {  GoogleLoginProvider,  AuthService,  SocialUser} from 'angular-6-social-login';
//import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { Socialusers } from '../shared/product';
import { SocialloginService } from '../service/sociallogin.service';
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
  response;
  socialusers = new Socialusers();
  constructor(
    private SocialloginService: SocialloginService,
    private router: Router,
    //private authService: AuthService,
    private snackBar: MatSnackBar //private loginService: LoginService
  ) {}

  ngOnInit(): void {}
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
    this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
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
}
