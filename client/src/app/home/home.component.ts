import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private rs: RestService) {

  }

  ngOnInit() {
  }
}
