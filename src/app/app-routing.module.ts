import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminlayoutComponent } from "./adminlayout/adminlayout.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { RiskassesmentComponent } from "./riskassesment/riskassesment.component";
import { AuthGuardService } from "../app/guard/authguard";
import { from } from "rxjs";
import { MakepaymentComponent } from "./makepayment/makepayment.component";
import { SearchpaymentComponent } from "./searchpayment/searchpayment.component";
import { AssessmentsComponent } from "./assessments/assessments.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "dash",
    component: AdminlayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: AssessmentsComponent,
        children: [
          { path: "pay", component: MakepaymentComponent },
          { path: "payments", component: SearchpaymentComponent },
          { path: "assesment", component: RiskassesmentComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
