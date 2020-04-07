import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

  constructor(
    //private snackBar: MatSnackBar
   
  ) { }

  ngOnInit(): void {
  }
  onStep(data) {}

}