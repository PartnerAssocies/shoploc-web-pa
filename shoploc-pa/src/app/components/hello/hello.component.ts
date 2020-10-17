import { Component, OnInit } from '@angular/core';
import {HelloService} from '../../services/hello.serive';
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  message :String;
  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
    this.helloService.getHelloMessage().subscribe(res =>{
      this.message = res;
    });
  }

}
