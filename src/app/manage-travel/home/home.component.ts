import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
//import { Product } from '../../shared/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  //products: Product[] = [];
  tiles: any;
  constructor(private dataService: DataService, private router: Router) {}
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  
  ngOnInit() {
    //console.log('local',localStorage.getItem('homeTilesData').length);
    let userLoginData : any;
    userLoginData = JSON.parse(localStorage.getItem('userLoginData'));
    this.tiles = userLoginData.tileMaster;
    // let userLoginData = localStorage.getItem('userLoginData').tileMaster;
    // console.log('tiles-----',userLoginData.tileMaster);
    // this.dataService
    //   .sendGetRequest()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res: HttpResponse<Product[]>) => {
    //     console.log(res);
    //     this.products = res.body;
    //   });
  }

  goToList(){
    console.log('goto');
    this.router.navigate(['/managetravel/tripList']);
  }

  gotoCreateTrip(){
    console.log('goto createTrip');
    this.router.navigate(['/managetravel/createTrip']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  // public firstPage() {
  //   this.products = [];
  //   this.dataService
  //     .sendGetRequestToUrl(this.dataService.first)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((res: HttpResponse<Product[]>) => {
  //       console.log(res);
  //       this.products = res.body;
  //     });
  // }
  // public previousPage() {
  //   if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
  //     this.products = [];
  //     this.dataService
  //       .sendGetRequestToUrl(this.dataService.prev)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res: HttpResponse<Product[]>) => {
  //         console.log(res);
  //         this.products = res.body;
  //       });
  //   }
  // }
  // public nextPage() {
  //   if (this.dataService.next !== undefined && this.dataService.next !== '') {
  //     this.products = [];
  //     this.dataService
  //       .sendGetRequestToUrl(this.dataService.next)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res: HttpResponse<Product[]>) => {
  //         console.log(res);
  //         this.products = res.body;
  //       });
  //   }
  // }
  // public lastPage() {
  //   this.products = [];
  //   this.dataService
  //     .sendGetRequestToUrl(this.dataService.last)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((res: HttpResponse<Product[]>) => {
  //       console.log(res);
  //       this.products = res.body;
  //     });
  // }
}
