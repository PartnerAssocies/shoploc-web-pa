import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-demande-commercant',
  templateUrl: './demande-commercant.component.html',
  styleUrls: ['./demande-commercant.component.scss']
})
export class DemandeCommercantComponent implements OnInit {

  @Input()
  username: string;
  @Input()
  description:string;
  @Input()
  siret:number;
  @Input()
  libelleMagasin:string;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
  }

  valideCommercant(){
    this.userService.acceptCommercant(this.username).subscribe(commercant => {
      window.location.reload();
    });
  }

  refuseCommercant(){
    this.userService.refuseCommercant(this.username).subscribe(commercant => {
      window.location.reload();
    });
  }
}
