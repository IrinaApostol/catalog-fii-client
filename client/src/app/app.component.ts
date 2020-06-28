import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails} from './authentication.service';
import { Router } from '@angular/router';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    registration_number: '',
    group: '',
    year: '',
    type: ''
  };

  constructor(public auth: AuthenticationService, private rs: RestService, private router: Router, private http: HttpClient) {
  }
  details: UserDetails;
  type: any;
  titular: any;
  ngOnInit() {
    this.details = this.auth.getUserDetails();
    this.details = this.details['identity'];
    this.type = localStorage.getItem('type');
    console.log(this.type);
  }
  get isStudent(): boolean { // verific daca userul e student
    return localStorage.getItem('type') === 'students';
  }
  get isTitular(): boolean { // verific daca userul e titular
    return localStorage.getItem('titular') === 'da';
  }
}
