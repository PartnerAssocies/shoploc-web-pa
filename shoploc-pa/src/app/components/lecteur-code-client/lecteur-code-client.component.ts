import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lecteur-code-client',
  templateUrl: './lecteur-code-client.component.html',
  styleUrls: ['./lecteur-code-client.component.scss']
})
export class LecteurCodeClientComponent implements OnInit {

  @ViewChild('scanner', { static: true })
  scanner: ZXingScannerComponent;

  public result : string;
  public hasCameras : boolean;
  public hasPermission : boolean;

  availableDevices: MediaDeviceInfo[];
  
  currentDevice: MediaDeviceInfo = null;
  hasDevices : boolean;

  constructor(
    private _location : Location
  ) { }

  ngOnInit(): void {
    this.initCamera();
    this.scanner.permissionResponse.subscribe(
      (perm: boolean) =>{
       this.hasPermission = perm;
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
    console.log('Result: ', resultString);
    this.result = resultString;
  }

  back(){
    this._location.back();
  }

}
