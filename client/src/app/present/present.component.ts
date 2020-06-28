import { Component, OnInit } from '@angular/core'
import { AuthenticationService, UserDetails, TokenPayload} from '../authentication.service'
import { RestService , codStudent } from '../rest.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css']
})

export class PresentComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthenticationService, public rs: RestService, private router: Router, private http: HttpClient) {
   }
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
  cod: string;
  type: string;

  creds: codStudent = {
    codIntrodus: ' ',
    studentEmail: ' '
  };
mesaj:any;
  present() {
    this.creds.studentEmail=this.details['email']
    this.rs.present(this.creds).subscribe(data => {
        console.log(data)
        this.mesaj = data;
      },
      err => {
        console.error(err)
      }
    )}
  materii:any;
  materie:any;
  tipOra:any;
  nrOra:any;
  code:any;

  ngOnInit() {
    this.details = this.auth.getUserDetails();
    this.details = this.details['identity'];
    this.type = localStorage.getItem('type');
    console.log(this.type);

    if (!this.isStudent){
      this.rs.sendEmail(localStorage.getItem('type'), this.details['email']).subscribe(data => {
        console.log(data)
        this.materii = data;
      });

    }
  }
  sendPresenceInfo(email,materie,tipOra,nrOra) {
    this.rs.sendPresenceInfo(email,materie,tipOra,nrOra).subscribe(data => {
      console.log(data)
      this.code = data;
      console.log(this.code)
    });}

  get isStudent(): boolean {
    return localStorage.getItem('type') === 'students';
  }

}

