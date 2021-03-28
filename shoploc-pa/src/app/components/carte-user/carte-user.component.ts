import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-carte-user',
  templateUrl: './carte-user.component.html',
  styleUrls: ['./carte-user.component.scss']
})
export class CarteUserComponent implements OnInit {

  public level: number;
  public qrValue: string;
  public generated: boolean;
  public username: string;

  constructor(
    private _location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.currentUserValue.username;
    this.generated = false;
    this.qrValue = "CLIENT;".concat(this.username);
    this.generated = true;
  }

  back() {
    this._location.back();
  }

}
