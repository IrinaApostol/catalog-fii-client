import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RestService } from './rest.service';

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  registration_number: string;
  group: string;
  year: string;
  exp: number;
  iat: number;
  type: string;
}
interface TokenResponse {
  token: string;
}
export interface TokenPayload {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  registration_number: string;
  group: string;
  year: string;
  type: string;
}

@Injectable()
export class AuthenticationService {
  user: any;
  constructor(private http: HttpClient, private router: Router, private restService: RestService) { }
  private token: string;

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
      //verif token din bd
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      // console.log(JSON.parse(payload));
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public isLoggedIn(): boolean {
    this.user = this.getUserDetails();
    //console.log(this.user)
    if (this.user) {
      return this.user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`/users/register`, user);
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/login`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public logout(): void {
    window.localStorage.removeItem('usertoken');
    this.restService.logout(this.token, this.user.identity.email).subscribe(data => {
      console.log(data)
      this.token = '';
      this.router.navigateByUrl('/');
    })
  }
}
