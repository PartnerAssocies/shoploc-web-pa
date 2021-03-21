import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommercantStatsService } from 'src/app/services/commercantstats.service';
import { CommercantStats } from 'src/app/models/data/CommercantStats.model';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { Location } from '@angular/common';
import { CommercantAllStats } from 'src/app/models/data/CommercantAllStats.model';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

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

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<any>;
  @ViewChild("chart", {static: false}) chart2: ChartComponent;
  public chartOptions2: Partial<any>;


  constructor(private _location : Location, private commercantStatsService : CommercantStatsService, private authService : AuthService) { }

  ngOnInit(): void {

    this.chartsInit();

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
    this.updateCharts('MOIS');
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

  updateCharts(typeDuree: string): void {
    const monthTransfo = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    this.commercantStatsService.getCharts(this.authentifiedUser, typeDuree).subscribe(res => {
      var xAxisDepenses = [];
      var yAxisDepenses = [];
      Object.keys(res.evolCaPeriode).forEach(key=>{ 
        if(typeDuree === "ANNEE")
          xAxisDepenses = monthTransfo;
        else
          xAxisDepenses.push(key);
        yAxisDepenses.push(res.evolCaPeriode[key]);
      })

      this.chartOptions = {
        series: [
          {
            name: "Historique du CA",
            data: yAxisDepenses
          }
        ],
        chart: {
          height: 'auto',
          type: "line"
        },
        title: {
          text: "Historique du CA"
        },
        xaxis: {
          categories: xAxisDepenses
        }
      };
      var xAxisObtenus = [];
      var yAxisObtenus = [];
      Object.keys(res.evolFideliteDepensesPeriode).forEach(key=>{
        if(typeDuree === "ANNEE")
          xAxisObtenus = monthTransfo;
        else
          xAxisObtenus.push(key);
        yAxisObtenus.push(parseFloat(res.evolCaPeriode[key]).toFixed(0));
      })

      this.chartOptions2 = {
        series: [
          {
            name: "Points de fidélité dépensés",
            data: yAxisObtenus
          }
        ],
        chart: {
          height: 'auto',
          type: "line"
        },
        title: {
          text: "Points de fidélité dépensés"
        },
        xaxis: {
          categories: xAxisObtenus
        }
      };
    });
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
