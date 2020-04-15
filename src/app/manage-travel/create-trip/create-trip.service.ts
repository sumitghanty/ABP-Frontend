import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTripService {
  private apiUrl = environment.apiUrl;
  allTravellerList : any;

  private dataStringSource = new BehaviorSubject<Object>('');

  // Observable string stream
  dataString$ = this.dataStringSource.asObservable();

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  public saveData(value){
    console.log("save data function called " , this.allTravellerList);
    this.allTravellerList = value;
    this.dataStringSource.next(this.allTravellerList);
  }

  tripSave(email,token,param){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .post(this.apiUrl+'createTrip', param, httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }


  tripUpdate(email,token,param){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .post(this.apiUrl+'updateTrip', param, httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

  getUserList(email,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .get(this.apiUrl+'getUserList', httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

  getRetainerList(email,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .get(this.apiUrl+'getRetainerList', httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

  
  saveGuest(email,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .get(this.apiUrl+'createUser', httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

  getFlightList(token,email,searchVal){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .post(this.apiUrl+'flightSearchService', searchVal, httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

  getHotelList(token,email,searchVal){
    console.log('token',token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .post(this.apiUrl+'hotelSearchService', searchVal, httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

  getTripList(email,token){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'emailId': email
      }),
    };

    return this.http
      .get(this.apiUrl+'getTripList', httpOptions)
      .pipe(map(response => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return response;
      }));
  }

}
