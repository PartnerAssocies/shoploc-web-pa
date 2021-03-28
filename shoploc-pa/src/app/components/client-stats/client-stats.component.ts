import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ClientstatsService } from 'src/app/services/clientstats.service';
import { AuthService } from 'src/app/services/auth.service';
import { ItemHisto } from 'src/app/models/data/ItemHisto.model';

interface ClientBonusInfo {
  prenom: string;
  nom: string;
  statut: string;
}

interface StatsInfos {
  joursRestant?: number,
  soldeFidelite?: number,
  totalFidelite?: number
}

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { max } from 'rxjs/operators';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};  
@Component({
  selector: 'app-client-stats',
  templateUrl: './client-stats.component.html',
  styleUrls: ['./client-stats.component.scss']
})
export class ClientStatsComponent implements OnInit {

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<any>;
  @ViewChild("chart", {static: false}) chart2: ChartComponent;
  public chartOptions2: Partial<any>;

  infos: StatsInfos;
  histoAchats: ItemHisto[];
  histoClickAndCollect: ItemHisto[];
  cols: any[];
  authentifiedUser : string;

  clientBonusInfo: ClientBonusInfo;


  constructor(private _location : Location, private clientstatsService : ClientstatsService, private authService : AuthService) { 
  }

  ngOnInit(): void {
    this.chartsInit();
    this.authentifiedUser = this.authService.currentUserValue.username;
    this.setInitialData();
    this.clientstatsService.getBonusInfoClient(this.authentifiedUser).subscribe(res => {
      this.clientBonusInfo = {
        prenom: res.prenom,
        nom: res.nom.toUpperCase(),
        statut: res.statut
      }
    });
    this.histoClickAndCollect = [];
    this.clientstatsService.getAllStats(this.authentifiedUser).subscribe(re => {
      this.infos = {
        joursRestant : re.jourVfpRestant,
        soldeFidelite : +parseFloat(""+re.soldeFidelite).toFixed(2),
        totalFidelite : +parseFloat(""+re.totalFidelite).toFixed(2)
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
    this.updateCharts('MOIS');
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


  updateCharts(typeDuree: string): void {
    this.clientstatsService.getDataGrid(this.authentifiedUser, typeDuree).subscribe(res => {
      var xAxisDepenses = [];
      var yAxisDepenses = [];
      Object.keys(res.historyPointsDepenses).forEach(key=>{
        if(typeDuree === "ANNEE")
          xAxisDepenses = this.formatMonth();
        else
          xAxisDepenses.push(key);
        yAxisDepenses.push(parseFloat(res.historyPointsDepenses[key]).toFixed(2));
      })

      this.chartOptions = {
        series: [
          {
            name: "Points dépensés",
            data: yAxisDepenses
          }
        ],
        chart: {
          height: 'auto',
          type: "line"
        },
        title: {
          text: "Points dépensés"
        },
        xaxis: {
          categories: xAxisDepenses
        }
      };
      var xAxisObtenus = [];
      var yAxisObtenus = [];
      Object.keys(res.historyPointsObtenus).forEach(key=>{
        if(typeDuree === "ANNEE")
          xAxisObtenus = this.formatMonth();
        else
          xAxisObtenus.push(key);
        yAxisObtenus.push(parseFloat(res.historyPointsObtenus[key]).toFixed(2));
      })

      this.chartOptions2 = {
        series: [
          {
            name: "Points obtenus",
            data: yAxisObtenus
          }
        ],
        chart: {
          height: 'auto',
          type: "line"
        },
        title: {
          text: "Points obtenus"
        },
        xaxis: {
          categories: xAxisObtenus
        }
      };
    });
  }

  formatMonth(): string[] {
    const monthTransfo = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let toRet = [];
    const today = new Date();
    let valToCount = today.getMonth()+1;
    if(valToCount == 12)
      valToCount = 0;
    for(var i = valToCount ; i < monthTransfo.length ; i++)
      toRet.push(monthTransfo[i]);
    for(var i = 0 ; i < valToCount  ; i++)
      toRet.push(monthTransfo[i]);
    return toRet;
  }


  chartsInit(): void{
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
    this.chartOptions2 = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }

}
