import { Component, OnInit } from "@angular/core";
import { config } from "../Helpers/constants";
import { ToastrService } from "ngx-toastr";
import { AssesmentService } from "../services/assesment.service";
import { NgxSpinnerService } from "ngx-spinner";
import { STKPush } from "../models/sktpush";

@Component({
  selector: "app-makepayment",
  templateUrl: "./makepayment.component.html",
  styleUrls: ["./makepayment.component.css"]
})
export class MakepaymentComponent implements OnInit {
  public response: STKPush;
  loading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private assesmentService: AssesmentService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}
  makePayment(phoneNumber, amount) {
    this.response = null;
    this.loading = true;
    this.spinner.show();
    let payload = {
      developer_username: config.developer_username,
      developer_api_key: config.developer_api_key,
      action: "initiatepayment",
      amount: amount.value,
      phone_number: phoneNumber.value
    };
    this.assesmentService.initiatePayment(payload).subscribe(
      res => {
        this.spinner.hide();
        this.loading = false;
        if (res.body.response_code == 0) {
          this.toastr.success(res.body.response_message);
          this.response = res.body;
        } else {
          this.toastr.error(res.body.response_message);
        }
      },
      error => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error("Please Try Again Later", "Server Error");
      }
    );
  }
}
