import { Component, Input, OnInit } from '@angular/core';

/**
 * Component d'inscription client
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  @Input() signUpType: 'client' | 'commercant';

  constructor() { }

  ngOnInit(): void {
    this.signUpType = "client";
  }

  onToggleChange(){
    console.log(this.signUpType);
    this.signUpType = this.signUpType === "client" ? "commercant" : "client";
  }

}
