import { Component, OnInit } from "@angular/core";
import { Payment, Transaction } from "../models/payment";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AssesmentService } from "../services/assesment.service";
import { config } from "../Helpers/constants";

@Component({
  selector: "app-searchpayment",
  templateUrl: "./searchpayment.component.html",
  styleUrls: ["./searchpayment.component.css"]
})
export class SearchpaymentComponent implements OnInit {
  payments: Transaction[];
  showLoading: boolean = false;

  constructor(
    private assesmentService: AssesmentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  searchPayment(phoneNumber) {
    this.payments = [];
    this.showLoading = true;
    let payload = {
      developer_username: config.developer_username,
      developer_api_key: config.developer_api_key,
      action: "searchpayment",
      phone_number: phoneNumber.value
    };
    this.assesmentService.searchPayment(payload).subscribe(
      res => {
        this.showLoading = false;

        if (res.body.response_code == 0) {
          this.payments = res.body.transactions;
          console.log(this.payments);
        } else {
          this.toastr.error(res.body.response_message);
        }
      },
      error => {
        this.showLoading = false;

        this.toastr.error("Server Error!", "Try Again Later");
      }
    );
  }
}
