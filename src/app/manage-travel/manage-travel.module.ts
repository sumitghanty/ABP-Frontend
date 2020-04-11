import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { HomeComponent } from './home/home.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { ManageTravelRoutingModule } from './manage-travel-routing.module';
import { ShareModule } from './../share/share.module';
import { TravelNavComponent } from './travel-nav/travel-nav.component';
import { TravellerModalComponent } from './create-trip/traveller-modal/traveller-modal.component';
import { ApproveTripComponent } from './approve-trip/approve-trip.component';
import { ExpenseClaimComponent } from './expense-claim/expense-claim.component';



@NgModule({
  declarations: [
    CreateTripComponent,
    HomeComponent,
    TravelNavComponent,
    TripListComponent,
    TravellerModalComponent,
    ApproveTripComponent,
    TripListComponent,
    ExpenseClaimComponent
  ],
  imports: [
    CommonModule, 
    ManageTravelRoutingModule,
    ShareModule
  ]
})
export class ManageTravelModule { }

