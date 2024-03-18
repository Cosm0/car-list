import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../vehicles.service';
import { Observable, Subscription } from 'rxjs';
import { Vehicle } from '../vehicle.model';
import { Renter } from '../renter.model';

@Component({
  selector: 'app-vehicles-main',

  templateUrl: './vehicles-main.component.html',
  styleUrls: ['./vehicles-main.component.css']
})
export class VehiclesMainComponent implements OnInit {
  constructor(private vehiclesService: VehiclesService) {}

  public loading = true;
  public errMsg: string;

  public allVehicles: Observable<Vehicle[]>;

  private vehiclesSubscription: Subscription;


  // registrationNumber: string;
  // vin: string;
  // renter?: Renter;
  // longitude: number;
  // latitude: number;

  public displayedColumns: string[] = ['id', 'brand', 'model', 'registrationNumber', 'vin', 'position', 'renter'];

  ngOnInit(): void {
    this.allVehicles = this.vehiclesService.getAll();
    this.vehiclesService.getAllTrigger();
  }

  getRenterDetails(renter: Renter) {
    if (!renter) return '---';
    return `${renter.firstname} ${renter.lastname}`
  }

  ngOnDestroy(): void {
    this.vehiclesSubscription.unsubscribe();
  }
}
