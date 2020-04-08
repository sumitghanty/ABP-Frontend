import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { HomeComponent } from './home/home.component';
import { ManageTravelRoutingModule } from './manage-travel-routing.module';
import { ShareModule } from './../share/share.module';
import { TravelNavComponent } from './travel-nav/travel-nav.component';
import { ApproveTripComponent } from './approve-trip/approve-trip.component';


@NgModule({
  declarations: [
    CreateTripComponent,
    HomeComponent,
    TravelNavComponent,
    ApproveTripComponent
  ],
  imports: [
    CommonModule, 
    ManageTravelRoutingModule,
    ShareModule
  ]
})
export class ManageTravelModule { }
