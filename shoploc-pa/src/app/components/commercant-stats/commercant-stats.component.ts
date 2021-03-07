import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommercantStatsService } from 'src/app/services/commercantstats.service';
import { CommercantStats } from 'src/app/models/data/CommercantStats.model';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { Location } from '@angular/common';

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

  constructor(private _location : Location, private commercantStatsService : CommercantStatsService, private authService : AuthService) { }

  ngOnInit(): void {
    this.authentifiedUser = this.authService.currentUserValue.username;
    this.commercantStatsService.getStatsDays(this.authentifiedUser).subscribe(res => {
      this.statsDuJour = res;
    });
    this.cols = [
      {field: 'what', header: 'Quoi?'},
      {field: 'total', header: 'Combien?'},
      {field: 'who', header: 'Où ?'}
  ];
  }

  back(){
    this._location.back();
  }

}
