import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    //BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    //MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    MatCardModule,
    //BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    //MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
  ]
})
export class ShareModule { }
