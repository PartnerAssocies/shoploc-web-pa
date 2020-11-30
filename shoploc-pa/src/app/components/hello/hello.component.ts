import { Component, OnInit } from '@angular/core';
import {HelloService} from '../../services/hello.service';
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  message :any;
  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
    this.helloService.getHelloMessage().subscribe(data => {
        this.message = data;
    });
  }

  

}
