import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AssoCommercantStats } from 'src/app/models/data/AssoCommercantStats.model';
import { AssocommercestatsService } from '../../services/assocommercestats.service';

@Component({
  selector: 'app-assocommerce-stats',
  templateUrl: './assocommerce-stats.component.html',
  styleUrls: ['./assocommerce-stats.component.scss']
})
export class AssocommerceStatsComponent implements OnInit {

  statsAssoCommercantMois: AssoCommercantStats;
  statsAssoCommercantAnnee: AssoCommercantStats;
  statsAssoCommercantCinqAns: AssoCommercantStats;
  cols: any[];

  unMoisActive: boolean;
  unAnActive: boolean;
  cinqAnsActive: boolean;

  constructor(private _location : Location, private assoCommerceStatsService: AssocommercestatsService) { }

  ngOnInit(): void {

    this.unMoisActive = true;
    this.unAnActive = false;
    this.cinqAnsActive = false;
    
    this.assoCommerceStatsService.getAllStats('MOIS').subscribe(value => {
      this.statsAssoCommercantMois = value;
      console.log(this.statsAssoCommercantMois);
    });
    this.assoCommerceStatsService.getAllStats('ANNEE').subscribe(value => {
      this.statsAssoCommercantAnnee = value;
    });
    this.assoCommerceStatsService.getAllStats('ANNEES').subscribe(value => {
      this.statsAssoCommercantCinqAns = value;
    });
    this.cols = [
      {field: 'magasin', header: 'Magasin'},
      {field: 'montant', header: 'Montant'}
  ];
  }

  swapToMonth(): void{
    this.unMoisActive = true;
    this.unAnActive = false;
    this.cinqAnsActive = false;
  }

  swapToYear(): void{
    this.unMoisActive = false;
    this.unAnActive = true;
    this.cinqAnsActive = false;
  }

  swapToFiveYears(): void{
    this.unMoisActive = false;
    this.unAnActive = false;
    this.cinqAnsActive = true;
  }


  back(){
    this._location.back();
  }

}
