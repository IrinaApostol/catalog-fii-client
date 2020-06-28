import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { PresentComponent } from './present/present.component'
import { FormulaComponent } from './formula/formula.component'
import { RestService } from './rest.service';
import { SubjectsComponent } from './subjects/subjects.component'
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'present',
    component: PresentComponent,
    canActivate: [AuthGuardService]},
  { path: 'subjects',
    component: SubjectsComponent,
    canActivate: [AuthGuardService]},
    { path: 'formula',
    component: FormulaComponent,
    canActivate: [AuthGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PresentComponent,
    SubjectsComponent,
    FormulaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuthGuardService,RestService
],
  bootstrap: [AppComponent]
})
export class AppModule {

}
