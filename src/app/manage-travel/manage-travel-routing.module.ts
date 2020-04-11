import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateTripComponent } from  './create-trip/create-trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TravelNavComponent } from './travel-nav/travel-nav.component';
import { ApproveTripComponent } from './approve-trip/approve-trip.component';
import { ExpenseClaimComponent } from './expense-claim/expense-claim.component';
import { ApproveExpenseComponent } from './approve-expense/approve-expense.component';
import { ApproveAdvanceComponent } from './approve-advance/approve-advance.component';





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
      },
      {
        path: 'tripList',
        component: TripListComponent
      },
      {
        path: 'expenseClaim',
        component: ExpenseClaimComponent
      },
      {
        path: 'approveExpense',
        component: ApproveExpenseComponent
      },
      {
        path: 'approveAdvance',
        component: ApproveAdvanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTravelRoutingModule { }
