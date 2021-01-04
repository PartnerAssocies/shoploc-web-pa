import { Component, Input, OnInit } from '@angular/core';
import { LieuData } from 'src/app/models/data/LieuData.model';
import { LieuService } from 'src/app/services/lieu.service';

@Component({
  selector: 'app-commercant-list-element',
  templateUrl: './commercant-list-element.component.html',
  styleUrls: ['./commercant-list-element.component.scss']
})
export class CommercantListElementComponent implements OnInit {

  @Input()
  libelleMagasin : string;

  @Input()
  description : string;

  @Input()
  lienImage : string;

  @Input()
  lieu : LieuData;

  constructor(
    private lieuService : LieuService
  ) { }

  ngOnInit(): void {

  }

  detailCommercant(){
    console.log("details")
  }
}
