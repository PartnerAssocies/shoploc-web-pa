import { Component, OnInit } from '@angular/core';
import { MairieStats } from 'src/app/models/data/MairieStats.model';
import { Location } from '@angular/common';
import { MairiestatsService } from 'src/app/services/mairiestats.service';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-mairie-stats',
  templateUrl: './mairie-stats.component.html',
  styleUrls: ['./mairie-stats.component.scss']
})
export class MairieStatsComponent implements OnInit {

  mairieStatsMois: MairieStats;
  mairieStatsAnnee: MairieStats;
  mairieStatsCinqAns: MairieStats;

  unMoisActive: boolean;
  unAnActive: boolean;
  cinqAnsActive: boolean;

  constructor(private _location : Location, private mairiestatsService: MairiestatsService) { }

  ngOnInit(): void {

    this.unMoisActive = true;
    this.unAnActive = false;
    this.cinqAnsActive = false;

    this.mairiestatsService.getStatsDays("MOIS").subscribe(value => {
      this.mairieStatsMois = value;
    });
    this.mairiestatsService.getStatsDays("ANNEE").subscribe(value => {
      this.mairieStatsAnnee = value;
    });
    this.mairiestatsService.getStatsDays("ANNEES").subscribe(value => {
      this.mairieStatsCinqAns = value;
    });
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
