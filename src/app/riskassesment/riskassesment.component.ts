import { Component, OnInit } from "@angular/core";
import { AssesmentService } from "../services/assesment.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-riskassesment",
  templateUrl: "./riskassesment.component.html",
  styleUrls: ["./riskassesment.component.css"]
})
export class RiskassesmentComponent implements OnInit {
  assesments = [];
  searched: boolean = false;
  showbtnfillform: boolean = false;
  searching: boolean = false;
  showUpdateForm: boolean = false;
  showPrevious: boolean = false;
  showPreviousClick: boolean = false;
  active = 1;

  constructor(
    private assesmentService: AssesmentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}
  toogleAssementForm() {
    this.showbtnfillform = !this.showbtnfillform;
  }
  onshowPrevious() {
    this.showPreviousClick = !this.showPreviousClick;
  }
  initiatePayment() {
    console.log("initiating payment");
  }
  searchPayment() {
    console.log("searching payment");
  }

  getUserAssessment(number) {
    this.showbtnfillform = false;
    this.showUpdateForm = false;
    this.showPrevious = false;
    this.showPreviousClick = false;
    this.searching = true;
    if (!number.value) {
      this.toastr.error("Please Enter Patient Number");
      this.searching = false;
      return;
    }
    this.assesmentService.getUserRiskAssesment(number.value).subscribe(
      res => {
        this.searching = false;
        if (res.body.response_code == 0) {
          this.assesments = res.body["risk_assesments"];
          if (this.assesments.length > 0 && this.assesments[0].full_name) {
            this.showPrevious = true;
          }
          if (!this.assesments[0].full_name) {
            console.log("updating needed");
            this.showUpdateForm = true;
          } else {
            this.showbtnfillform = true;
          }
        }
        if (!res.body.hasOwnProperty("risk_assesments")) {
          this.showbtnfillform = true;
          this.showPrevious = false;
          console.log("user does not exist");
          this.toastr.success(`No record found For user ${number.value}`);
        }
      },
      error => {
        this.searching = false;
        this.toastr.error("Try Again Later", "Server Error");
      }
    );
  }
}
