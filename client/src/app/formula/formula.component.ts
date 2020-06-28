import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { RestService} from '../rest.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})

export class FormulaComponent implements OnInit {
  options = [
    {name: 'Prezente laborator/seminar (P)', value: 'P', checked: false},
    {name: 'Prezenta Curs (PC)', value: 'PC', checked: false},
    {name: 'Teste laborator (T)', value: 'T', checked: false},
    {name: 'Examen (E)', value: 'E', checked: false},
    {name: 'Partial (PR)', value: 'PR', checked: false},
    {name: 'Teme (H)', value: 'H', checked: false},
    {name: 'Bonus (B)', value: 'B', checked: false},
    {name: 'Activitate Laborator/Seminar (A)', value: 'A', checked: false},
    {name: 'Proiect (PJ)', value: 'PJ', checked: false},
    {name: 'Prezenta Consultatii (PCons)', value: 'PCons', checked: false},
  ];

  materii: any;
  details: UserDetails;
  type: any;
  alese: any; // metodele de evaluare alese
  materia: any; // materia la care schimba formula
  formula: any; // noua formula
  aprox: any; // modalitatea de aproximare
  mesaj: any; // ce primim de la server

  public conditii: any[] = [{
    id: 1,
    conditie: ''
  }];

  cate: any = {
    T: '0',
    H: '0',
    A: '0'
  };
  constructor(public rs: RestService,  public auth: AuthenticationService, public router: Router){}
  ngOnInit() {
    this.details = this.auth.getUserDetails();
    this.details = this.details['identity'];
    this.type = localStorage.getItem('type');
    console.log(this.type);
    this.rs.sendEmailFormula(localStorage.getItem('type'), this.details['email']).subscribe(data => {
    console.log(data);
    this.materii = data; });
    }

get isStudent(): boolean { // verific daca userul e student
  return localStorage.getItem('type') === 'students';
}
selectedOptions() {
  this.alese = this.options.filter(opt => opt.checked).map(opt => opt.value);
  // alert(this.alese)
}

sendFormula(email, materia, alese, conditii, cate, formula, aprox) {
  this.rs.sendFormula(email, materia, alese, conditii, cate, formula, aprox).subscribe(data => {
    this.mesaj = data;
    alert(this.mesaj.response);
  });
}

  addConditie() {
    this.conditii.push({
      id: this.conditii.length + 1,
      conditie: ''
    });
  }

  removeConditie(i: number) {
    this.conditii.splice(i, 1);
  }
  execute(){
    this.alese = this.options.filter(opt => opt.checked).map(opt => opt.value);
  }
}

