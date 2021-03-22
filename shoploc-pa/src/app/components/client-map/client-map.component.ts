import { AfterViewInit, Component, Output, EventEmitter, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { UserService } from 'src/app/services/user.service';
import { CommercantData } from 'src/app/models/data/CommercantData.model';

@Component({
  selector: 'app-client-map',
  templateUrl: './client-map.component.html',
  styleUrls: ['./client-map.component.scss']
})
export class ClientMapComponent implements AfterViewInit {

  @Output()
  selected = new EventEmitter<CommercantData>();

  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.initMap(this.selected);
  }

  private initMap(selectionEventEmitter: EventEmitter<CommercantData>): void {
    const myIcon = L.icon({
      iconUrl: 'assets/icons/localisation-icon.png',
      popupAnchor: [0, -20],
      iconSize: [42, 54]
    });

    const commercantIcon = L.icon({
      iconUrl: 'assets/icons/commercant-localisation.png',
      popupAnchor: [0, -20],
      iconSize: [37, 45]
    });

    var map = L.map('map', {
      center: [50.636778, 3.063888],
      zoom: 10
    });
    this.userService.getListCommercant().subscribe(response => {
      for (let commercant of response) {
        var marker = L.marker([(commercant.lieu.coordx), (commercant.lieu.coordy)], { icon: commercantIcon }).bindPopup(commercant.libelleMagasin)
        marker.on('click', function (e) {
          this.openPopup();
          this.showSelectedCommerceInfo = commercant.username;
          selectionEventEmitter.emit(commercant);
        })
        marker.addTo(map);

      }
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    //on va localiser le client avec son accord
    map.locate({ setView: true, maxZoom: 20 });


    function onLocationFound(e) {

      L.marker(e.latlng, { icon: myIcon })
        .bindPopup("Vous êtes ici").addTo(map).openPopup();


    }

    map.on('locationfound', onLocationFound);
    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationerror', onLocationError);
  }
}
