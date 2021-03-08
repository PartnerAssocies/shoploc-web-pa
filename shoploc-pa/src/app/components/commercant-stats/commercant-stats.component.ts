import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommercantStatsService } from 'src/app/services/commercantstats.service';
import { CommercantStats } from 'src/app/models/data/CommercantStats.model';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { Location } from '@angular/common';
import { CommercantAllStats } from 'src/app/models/data/CommercantAllStats.model';

@Component({
  selector: 'app-commercant-stats',
  templateUrl: './commercant-stats.component.html',
  styleUrls: ['./commercant-stats.component.scss']
})
export class CommercantStatsComponent implements OnInit {

  statsDuJour: CommercantStats;
  cols: any[];
  histo: any[];
  authentifiedUser: string;
  title: string;
  
  unMoisActive: boolean;
  unAnActive: boolean;
  cinqAnsActive: boolean;

  commercantStatsMois : CommercantAllStats;
  commercantStatsAnnee : CommercantAllStats;
  commercantStatsAnnees : CommercantAllStats;

  constructor(private _location : Location, private commercantStatsService : CommercantStatsService, private authService : AuthService) { }

  ngOnInit(): void {

    this.unMoisActive = true;
    this.unAnActive = false;
    this.cinqAnsActive = false;

    this.authentifiedUser = this.authService.currentUserValue.username;
    this.title = `${this.authentifiedUser} : Stats du jour`;
    this.commercantStatsService.getStatsDays(this.authentifiedUser).subscribe(res => {
      this.statsDuJour = res;
    });
    this.cols = [
      {field: 'what', header: 'Quand?'},
      {field: 'total', header: 'Combien?'},
      {field: 'who', header: 'Qui ?'}
  ];
    this.commercantStatsService.getAllStats(this.authentifiedUser, "MOIS").subscribe(res => {
      this.commercantStatsMois = res;
    });
    this.commercantStatsService.getAllStats(this.authentifiedUser, "ANNEE").subscribe(res => {
      this.commercantStatsAnnee = res;
    });
    this.commercantStatsService.getAllStats(this.authentifiedUser, "ANNEES").subscribe(res => {
      this.commercantStatsAnnees = res;
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
