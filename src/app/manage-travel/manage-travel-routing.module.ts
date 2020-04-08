import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateTripComponent } from  './create-trip/create-trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TravelNavComponent } from './travel-nav/travel-nav.component';
import { ApproveTripComponent } from './approve-trip/approve-trip.component';




const routes: Routes = [
  {
    path:'', component: TravelNavComponent,
    children: [
      { 
        path: 'dashboard',
        component: HomeComponent
      },
      { 
        path: 'createTrip',
        component: CreateTripComponent
      },
      { 
        path: 'approveTrip',
        component: ApproveTripComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTravelRoutingModule { }
