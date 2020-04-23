import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private httpClient: HttpClient) {}

  getTokenOrEmail(){
    let userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    const dataObj = {emailId: '',token:''};
    if(userLoginData){
      dataObj.emailId = userLoginData.login.userEmail;
      dataObj.token = userLoginData.login.generatedToken;
      return dataObj;
    }
  }
  
}
