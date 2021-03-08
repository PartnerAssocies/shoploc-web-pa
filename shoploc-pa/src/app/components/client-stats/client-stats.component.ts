import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientstatsService } from 'src/app/services/clientstats.service';
import { AuthService } from 'src/app/services/auth.service';
import { ItemHisto } from 'src/app/models/data/ItemHisto.model'

interface StatsInfos {
  joursRestant?: number,
  soldeFidelite?: number,
  totalFidelite?: number
}

@Component({
  selector: 'app-client-stats',
  templateUrl: './client-stats.component.html',
  styleUrls: ['./client-stats.component.scss']
})
export class ClientStatsComponent implements OnInit {

  infos: StatsInfos;
  histoAchats: ItemHisto[];
  histoClickAndCollect: ItemHisto[];
  cols: any[];
  authentifiedUser : string;

  constructor(private _location : Location, private clientstatsService : ClientstatsService, private authService : AuthService) { }

  ngOnInit(): void {
    this.authentifiedUser = this.authService.currentUserValue.username;
    this.setInitialData();
    this.clientstatsService.getAllStats(this.authentifiedUser).subscribe(re => {
      this.infos = {
        joursRestant : re.jourVfpRestant,
        soldeFidelite : re.soldeFidelite,
        totalFidelite : re.totalFidelite
      }
      this.histoAchats = [];
      re.histoAchats.forEach(res => {
        const itemHisto : ItemHisto = {
          what: res.what,
          who: res.who,
          total: res.total
        }
        this.histoAchats.push(itemHisto);
      })
      re.histoClickAndCollect.forEach(res => {
        const itemHisto : ItemHisto = {
          what: res.what,
          who: res.who,
          total: res.total
        }
        this.histoClickAndCollect.push(itemHisto);
      });
    });
  }


  setInitialData(): void {
    this.infos = {
      joursRestant: 0,
      soldeFidelite: 0,
      totalFidelite: 0
    };
    this.histoAchats = [
      {
        what: 'Pomme',
        total: 200,
        who: 'Chez Jojo le bon marchand'
      },
      {
        what: 'Pomme',
        total: 200,
        who: 'Chez Jojo le bon marchand'
      },
      {
        what: 'Pomme',
        total: 200,
        who: 'Chez Jojo le bon marchand'
      },
      {
        what: 'Pomme',
        total: 200,
        who: 'Chez Jojo le bon marchand'
      }
    ]

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
