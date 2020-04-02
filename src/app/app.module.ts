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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GoogleLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { TripListComponent } from './trip-list/trip-list.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { ApproveTripComponent } from './approve-trip/approve-trip.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ApproveExpenseComponent } from './approve-expense/approve-expense.component';
import { ApproveAdvanceComponent } from './approve-advance/approve-advance.component';
export function socialConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '184119169006-2g2l7j1rieepfq8hhepbmpv6u0crje3a.apps.googleusercontent.com'
      )
    }
  ]);
  return config;
}
@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, TripListComponent, CreateTripComponent, ApproveTripComponent, CreateExpenseComponent, ApproveExpenseComponent, ApproveAdvanceComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
