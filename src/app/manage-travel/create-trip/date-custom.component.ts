import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatHorizontalStepper } from '@angular/material/stepper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TravellerModalComponent } from './traveller-modal/traveller-modal.component';
import { CreateTripService } from './../../core/service/create-trip.service';
import {MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { TripInformation } from './../../core/do-model/trip-information';
import { CreateTripFuncComponent } from './create-trip-func.component';

/************************* Start bootstrap injectable date picker **********************/
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

/************************* End bootstrap injectable date picker **********************/
