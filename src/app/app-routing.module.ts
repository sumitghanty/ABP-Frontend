import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './auth/header/header.component';
import { AuthGuard } from './core/auth-gaurd/auth.guard';
//import { TripListComponent } from './trip-list/trip-list.component';
//import { ApproveTripComponent } from './approve-trip/approve-trip.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent },
  //{ path: 'login', component: LoginComponent },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)
  },
  { 
    path: 'managetravel', 
    loadChildren: () => import('./manage-travel/manage-travel.module').then(m => m.ManageTravelModule),
    //canActivate: [AuthGuard]
  },
  //{ path: 'approveTrip', component: ApproveTripComponent }
];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}

