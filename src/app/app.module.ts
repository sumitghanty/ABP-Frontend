import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { MatChipInputEvent } from '@angular/material/chips';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatHorizontalStepper } from '@angular/material/stepper';
import {MatStepperModule} from '@angular/material/stepper';


//import { GoogleLoginProvider, AuthService } from 'angular-6-social-login';
//import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { TripListComponent } from './trip-list/trip-list.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ApproveTripComponent } from './approve-trip/approve-trip.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ApproveExpenseComponent } from './approve-expense/approve-expense.component';
import { ApproveAdvanceComponent } from './approve-advance/approve-advance.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
    HomeComponent,
    LoginComponent,
    TripListComponent,
    CreateTripComponent,
    ApproveTripComponent,
    CreateExpenseComponent,
    ApproveExpenseComponent,
    ApproveAdvanceComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
    //MatChipInputEvent,
    //MatSnackBar
  ],
  providers: [
    /*{
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
