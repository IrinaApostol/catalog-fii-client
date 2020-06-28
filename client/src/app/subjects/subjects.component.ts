import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  formGroup: FormGroup;
  paramsArray: any;

  constructor(public rs: RestService, public auth: AuthenticationService, public router: Router, private _fb: FormBuilder) {


  }

  get isStudent(): boolean { // verific daca userul e student
    return localStorage.getItem('type') === 'students';
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

  type: any;
  gradeType: any;
  details: UserDetails;
  materii: any;
  subject: string;
  note: any;
  grupe: any; //grupele la care preda materia aleasa
  g: any; //grupa aleasa
  listaSt: any;
  numbr: any;
  nota: any;
  gradesList: any;
  existaPrezente: 1;
  response:any;
  ngOnInit() {
    this.details = this.auth.getUserDetails();
    this.details = this.details['identity'];
    this.type = localStorage.getItem('type');
    console.log(this.type);

    this.paramsArray = new FormArray([]);

    this.formGroup = new FormGroup({
      "values": this.paramsArray
    });



    if (!this.isStudent) {
      this.rs.sendProfEmail(this.details['email']).subscribe(data => { this.materii = data; })
    }
    if (this.isStudent) { this.rs.sendStudEmail(this.details['email']).subscribe(data => { this.materii = data; }) }
  }
  execute() {
    this.rs.sendGradeSubject(this.details['email'], this.subject).subscribe(data => { this.grupe = data; })
  }
  sendStudSubject() {
    this.rs.sendStudSubject(this.details['email'], this.subject).subscribe(data => {
      this.note = data;
      if (this.note.grade.length > 0 ) {

      if(this.note.grade[0].laboratory_score != null)
       { this.note.grade[0].laboratory_score = {
          "keys": Object.keys(JSON.parse(this.note.grade[0].laboratory_score))
          , "values": Object.values(JSON.parse(this.note.grade[0].laboratory_score))
        };
        console.log(this.note.grade[0].laboratory_score)
      }
      if(this.note.grade[0].laboratory_test != null){


        this.note.grade[0].laboratory_test = {
          "keys": Object.keys(JSON.parse(this.note.grade[0].laboratory_test))
          , "values": Object.values(JSON.parse(this.note.grade[0].laboratory_test))
        };
        console.log(this.note.grade[0].laboratory_test)}

        if(this.note.grade[0].homework != null){
        this.note.grade[0].homework = {
          "keys": Object.keys(JSON.parse(this.note.grade[0].homework))
          , "values": Object.values(JSON.parse(this.note.grade[0].homework))
        };
        console.log(this.note.grade[0].homework)}

      }

    })
  }

  info() {
    console.log(this.paramsArray.value)
    this.rs.sendNote(this.subject, this.g, this.gradeType, this.numbr, this.paramsArray.value).subscribe(data => {
      this.response = data;
    })


  }
  sendGradeInfo() {
    this.rs.sendGradeInfo(this.details['email'], this.subject, this.g, this.gradeType, this.numbr).subscribe(data => {
      this.paramsArray = new FormArray([]);
      this.formGroup = new FormGroup({
        "values": this.paramsArray
      });
      this.listaSt = data;
      this.listaSt.response.forEach(element => {
      this.paramsArray.push(new FormControl(''))
      });

    })
  }

}
