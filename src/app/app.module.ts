import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/auth-gaurd/auth.guard';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './auth/header/header.component';
import { FooterComponent } from './auth/footer/footer.component';
import { SocialloginService } from './core/service/sociallogin.service';
import { ShareModule } from './share/share.module';
import { TokenIntercepterService } from './core/service/token-intercepter.service';
import { ErrorInterceptorService } from './core/service/error-interceptor.service';
import { DataService } from './core/service/data.service';

/*export function socialConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '184119169006-2g2l7j1rieepfq8hhepbmpv6u0crje3a.apps.googleusercontent.com'
      )
    }
  ]);
  return config;
}*/
@NgModule({
  declarations: [
    AppComponent,
    //HomeComponent,
    //LoginComponent,
    //TripListComponent,
    //CreateTripComponent,
    //ApproveTripComponent,
    //CreateExpenseComponent,
    //ApproveExpenseComponent,
    //ApproveAdvanceComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // //MatCardModule,
    // MatProgressSpinnerModule,
    // MatStepperModule,
    // MatFormFieldModule,
    // MatDialogModule,
    // MatInputModule,
    ShareModule
    //MatChipInputEvent,
    //MatSnackBar
  ],
  providers: [
    SocialloginService,
    DataService,
    AuthGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
    /*{
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
