import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { config } from "../Helpers/constants";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  get f_data() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.initalizeForm();
  }
  initalizeForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  onLogin() {
    this.spinner.show();
    this.authService
      .getAuth(this.f_data.username.value, this.f_data.password.value)
      .subscribe(
        res => {
          this.spinner.hide();
          if (res.body.response_code == 0) {
            console.log(res.body);
            localStorage.setItem(config.current_user_name, res.body.username);
            localStorage.setItem(
              config.current_user_phone,
              res.body.phone_number
            );
            localStorage.setItem(
              config.current_user_facility_code,
              res.body.facility_code
            );
            this.toastr.success("Successfully logged In");
            this.router.navigate(["/dash"]);
          } else {
            this.toastr.error("Wrong username and password combination");
          }
        },
        error => {
          this.spinner.hide();
          this.toastr.error("Please Try Again later");
        }
      );
  }
}
