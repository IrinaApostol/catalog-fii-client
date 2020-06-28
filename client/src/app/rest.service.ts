import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface addGrade {
  grade: string;
  formula: string;
}

export interface codStudent {
  codIntrodus: string;
  studentEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService implements OnInit {

  constructor(private http: HttpClient) { }

  url: string = 'https://127.0.0.1:5000';

  ngOnInit() { }

  public present(user: codStudent): Observable<any> {
    let body = {
        type : localStorage.getItem('type'),
        studentEmail: user.studentEmail,
        codIntrodus: user.codIntrodus
    }
    return this.http.post(`/users/present`, body);
  }

  public logout(token, email):Observable<any>{
    let body = {
        token : token,
        email: email
    }
    return  this.http.post(`/users/logout`, body);
  }
  public sendType(type):Observable<any>{
    let body = {
        type : type
    }
    return  this.http.post(`/users/present`, body);
  }
  public sendEmail(type,email):Observable<any>{
    let body = {
        type : type,
        email : email
    }
    return  this.http.post(`/users/present`, body);
  }
  public sendEmailFormula(type,email):Observable<any>{
    let body = {
        type : type,
        email : email
    }
    return  this.http.post(`/users/formula`, body);
  }

  public sendFormula(email,materia,alese,cate,conditii,formula,aprox):Observable<any>{
    let body = {
        email : email,
        materia: materia,
        alese: alese,
        cate:cate,
        conditii:conditii,
        formula:formula,
        aprox:aprox
    }
    return  this.http.post(`/users/formula2`, body);
  }

public sendNewFormula(type,email):Observable<any>{
    let body = {
        type : type,
        email : email
    }
    return  this.http.post(`/users/formula`, body);
  }

  public sendStudEmail(email):Observable<any>{
    let body = {
        email : email
    }
    return  this.http.post(`/users/subjects/students`, body);
  }
  public sendStudSubject(email,subject):Observable<any>{
    let body = {
        email : email,
        subject:subject
    }
    return  this.http.post(`/users/subjects/students2`, body);
  }
  public sendProfEmail(email):Observable<any>{
    let body = {
        email : email
    }
    return  this.http.post(`/users/subjects/prefessors`, body);
  }
  public sendGradeSubject(email,subject):Observable<any>{
    let body = {
        email : email,
        subject:subject
    }
    return  this.http.post(`/users/subjects/prefessors2`, body);
  }
  public sendGradeInfo(email,subject,g,gradeType,numbr):Observable<any>{
    let body = {
        email : email,
        subject:subject,
        g:g,
        gradeType:gradeType,
        numbr:numbr
    }
    return  this.http.post(`/users/subjects/prefessors3`, body);
  }

  public sendPresenceInfo(email, materie, tipOra, nrOra): Observable<any> {
    let body = {
        email: email,
        materie: materie,
        tipOra: tipOra,
        nrOra: nrOra
    }
    return  this.http.post(`/users/nou`, body);
  }

  public sendEmailGetTitular(email): Observable<any> {
    let body = {
        email: email
    }
    return  this.http.post(`/users/titular`, body);
  }

  public sendNote(subject, g, gradeType, numbr, paramsArray): Observable<any> {
    let body = {
      subject: subject,
      g : g,
      gradeType: gradeType,
      numbr: numbr,
      paramsArray: paramsArray
    }
    return  this.http.post(`/users/notele`, body);
  }
}
