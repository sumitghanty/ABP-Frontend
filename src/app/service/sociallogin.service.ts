import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  private apiUrl = environment.apiUrl;
  
  url;
  constructor(private http: HttpClient) {}
  Savesresponse(responce) {
    this.url = 'http://localhost:64726/Api/Login/Savesresponse';
    return this.http.post(this.url, responce);
  }

  login(token,param){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
        'Access-Control-Allow-Origin':'*'
      }),
    };
    console.log('call',param);
    return this.http
      .post(this.apiUrl+'login', param, httpOptions)
      .pipe(map(user => {
        // if (user.data && user.data.accessToken) {
        //   this.storage.set('shopData', user.data);
        // }
        return user;
      }));
  }

}
