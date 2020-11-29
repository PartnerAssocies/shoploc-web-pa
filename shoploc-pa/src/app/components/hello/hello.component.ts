import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {HelloService} from '../../services/hello.service';
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  message :any;
  constructor(private helloService: HelloService,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.helloService.getHelloMessage().subscribe(data => {
        this.message = data;
    });
  }

  

}
