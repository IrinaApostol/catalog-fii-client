import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthenticationService) { }
type: string;
ceva: any;
  ngOnInit() {
    this.details = this.auth.getUserDetails();
    this.details = this.details['identity'];
    this.type = localStorage.getItem('type');
    this.ceva=this.auth.user
  }
  get isStudent(): boolean {
    return localStorage.getItem('type') === 'students';
  }



}


