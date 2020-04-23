import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req, next){
      let dataObj : any;
      let dataService = this.injector.get(DataService);
      dataObj = dataService.getTokenOrEmail();
      console.log('dataObj',dataObj);
      if(!dataObj){
        return next.handle(req);
      }
      let tokenReq = req.clone({
        setHeaders:{
          token: dataObj.token,
          emailId: dataObj.emailId
        }
      })
      return next.handle(tokenReq);  
  }

}
