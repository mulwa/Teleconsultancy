import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-adminlayout",
  templateUrl: "./adminlayout.component.html",
  styleUrls: ["./adminlayout.component.css"]
})
export class AdminlayoutComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logOut();
    this.router.navigate([""]);
  }
}
