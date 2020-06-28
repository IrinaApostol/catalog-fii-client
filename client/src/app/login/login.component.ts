import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../authentication.service';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
  titular:any;
  constructor(private auth: AuthenticationService, private router: Router, private rs: RestService) {}
  mesaj: any;
  login() {
    this.auth.login(this.credentials).subscribe(data => {
      this.mesaj = data;
      localStorage.setItem('type', this.credentials.type);
      this.rs.sendEmailGetTitular(this.credentials.email).subscribe(data => {
        console.log(data);
        this.titular = data;
        localStorage.setItem('titular', this.titular.titular);
      });

      this.router.navigateByUrl('/profile');
      },
      err => {
        console.error(err);
      }
    );
  }

}
