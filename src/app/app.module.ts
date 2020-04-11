import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ContentComponent } from "./content/content.component";
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AssesmentResultComponent } from "./assesment/assesment-result/assesment-result.component";
import { LoginComponent } from "./login/login.component";
import { AdminlayoutComponent } from "./adminlayout/adminlayout.component";
import { RiskassesmentComponent } from "./riskassesment/riskassesment.component";
import { HttpClientModule } from "@angular/common/http";
import { AssesmentService } from "./services/assesment.service";
import { AuthenticationService } from "./services/authentication.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoaderComponent } from "./loader/loader.component";
import { UpdateAssesmentComponent } from "./update-assesment/update-assesment.component";
import { MakepaymentComponent } from './makepayment/makepayment.component';
import { SearchpaymentComponent } from './searchpayment/searchpayment.component';
import { AssessmentsComponent } from './assessments/assessments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    QuestionnaireComponent,
    SigninComponent,
    AssesmentResultComponent,
    LoginComponent,
    AdminlayoutComponent,
    RiskassesmentComponent,
    LoaderComponent,
    UpdateAssesmentComponent,
    MakepaymentComponent,
    SearchpaymentComponent,
    AssessmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [AssesmentService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
