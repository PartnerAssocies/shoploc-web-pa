import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-lecteur-code-commercant',
  templateUrl: './lecteur-code-commercant.component.html',
  styleUrls: ['./lecteur-code-commercant.component.scss']
})
export class LecteurCodeCommercantComponent implements OnInit {

  @ViewChild('scanner', { static: true })
  scanner: ZXingScannerComponent;

  public result : string;
  public hasCameras : boolean;
  public hasPermission : boolean;
  public isLoading : boolean;

  availableDevices: MediaDeviceInfo[];
  
  currentDevice: MediaDeviceInfo = null;
  hasDevices : boolean;

  constructor(
    private _location : Location,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.initCamera();
    this.scanner.permissionResponse.subscribe(
      (perm: boolean) =>{
       this.hasPermission = perm;
       this.isLoading = !perm; 
      });
  }

  private initCamera(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      this.currentDevice = null;
      if (this.availableDevices.length > 1) {
        const defaultCamera = this.availableDevices.filter(e => e.label.toLocaleLowerCase().indexOf('back') > -1);
        if (defaultCamera !== null && defaultCamera !== undefined) {
          this.currentDevice = defaultCamera[0];
        } else {
           this.currentDevice = this.availableDevices[0];
        }
      } else {
        this.currentDevice = this.availableDevices[0];
      }
    });
  }

  handleQrCodeResult(resultString: string) {
    this.result = resultString;
    this.router.navigate(['creation-commande-commercant'],{queryParams: { client : this.result}})
  }

  back(){
    this._location.back();
  }

}
