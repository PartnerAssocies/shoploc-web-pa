import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CommercantData } from 'src/app/models/data/CommercantData.model';
import { UserService } from 'src/app/services/user.service';
import "leaflet/dist/images/marker-shadow.png";

@Component({
  selector: 'app-client-trajet',
  templateUrl: './client-trajet.component.html',
  styleUrls: ['./client-trajet.component.scss']
})
export class ClientTrajetComponent implements OnInit {

  commercant : CommercantData;

  constructor(private _location : Location,
              private userService : UserService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {

    this.activateRoute.queryParams.subscribe(params => {
      this.userService.getCommercant(params['commercant']).subscribe(res => {
        this.commercant = res;

        var map = L.map('map-trajet', {
          center: [50.636778, 3.063888],
          zoom: 10
        });
   
        //on va localiser le client avec son accord
        map.locate({ setView: true, maxZoom: 20})
            .on('locationfound', onLocationFound)
            .on('locationerror', onLocationError);
    
        let user_x : number;
        let user_y : number;
    
        function onLocationFound(e) {
          user_x = e.latitude;
          user_y = e.longitude;

          L.Routing.control({
            waypoints: [
                L.latLng(user_x, user_y),
                L.latLng(res.lieu.coordx, res.lieu.coordy)
            ],
            router: L.Routing.mapbox('pk.eyJ1IjoibWFyZmlsciIsImEiOiJja21odjFxM24wYjJuMnpuemIxeGhmd2FxIn0.NWYgMG31huNzvNOp_yWWfg', {
              language: 'fr'
            }),
            addWaypoints: false,
            plan : new L.Routing.Plan([L.latLng(user_x, user_y), L.latLng(res.lieu.coordx, res.lieu.coordy)], {
              createMarker: function (i: number, waypoint: any, n: number) {
                if(i === 0){
                  return L.marker(waypoint.latLng, {
                    icon: L.icon({
                      iconUrl: 'assets/icons/localisation-icon.png',
                      popupAnchor: [0, -20],
                      iconSize: [42, 54]
                    })
                  }).bindPopup("Vous êtes ici").addTo(map).openPopup();
                } else {
                  return L.marker(waypoint.latLng, {
                    icon: L.icon({
                      iconUrl: 'assets/icons/commercant-localisation.png',
                      popupAnchor: [0, -20],
                      iconSize: [37, 45]
                    })
                  });
                }  
              }
            }),
            formatter : new L.Routing.Formatter({ distanceTemplate: '{value} {unit}', language: 'fr' }
            ),
            showAlternatives: false,
            lineOptions: {styles: [{color: '#242c81', weight: 5}], extendToWaypoints : false, missingRouteTolerance: 0}
          }).addTo(map);   
         
        }
    
        function onLocationError(e) {
          alert(e.message);
        }      

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 20,
          tileSize: 512,
          zoomOffset: -1
        }).addTo(map);

      })
      
    });
    
  }

  back(){
    this._location.back();
  }

}
