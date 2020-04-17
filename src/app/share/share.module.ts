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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import { MatChipInputEvent } from '@angular/material/chips';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatHorizontalStepper } from '@angular/material/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { PopoverModule } from "ngx-smart-popover";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
//import {MatDatepickerModule} from '@angular/material/datepicker';

//import { MdePopoverModule } from '@angular/material/mde';




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
    MatInputModule,
    MatAutocompleteModule,
    PopoverModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    //MatDatepickerModule
    //MdePopoverModule
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
    MatAutocompleteModule,
    PopoverModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    //MatDatepickerModule
    //MdePopoverModule
  ]
})
export class ShareModule { }
