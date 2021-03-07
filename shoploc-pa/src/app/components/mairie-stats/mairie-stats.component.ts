import { Component, OnInit } from '@angular/core';
import { MairieStats } from 'src/app/models/data/MairieStats.model';
import { Location } from '@angular/common';
import { MairiestatsService } from 'src/app/services/mairiestats.service';

@Component({
  selector: 'app-mairie-stats',
  templateUrl: './mairie-stats.component.html',
  styleUrls: ['./mairie-stats.component.scss']
})
export class MairieStatsComponent implements OnInit {

  mairieStatsMois: MairieStats;
  mairieStatsAnnee: MairieStats;
  mairieStatsCinqAns: MairieStats;

  constructor(private _location : Location, private mairiestatsService: MairiestatsService) { }

  ngOnInit(): void {

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

  back(){
    this._location.back();
  }

}
