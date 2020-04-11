import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { config } from "../Helpers/constants";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  getAuth(username: string, password: string) {
    let body = {
      developer_username: config.developer_username,
      developer_api_key: config.developer_api_key,
      action: "userlogin",
      username,
      password
    };
    return this.http.post<User>(`${config.apiUrl}users`, body, {
      observe: "response"
    });
  }

  getCurrentUserPhone() {
    if (localStorage.getItem(config.current_user_phone)) {
      return localStorage.getItem(config.current_user_phone);
    }
  }
  getCurrentUserName() {
    if (localStorage.getItem(config.current_user_name)) {
      return localStorage.getItem(config.current_user_name);
    }
  }
  getFacilityCode() {
    if (localStorage.getItem(config.current_user_facility_code)) {
      return localStorage.getItem(config.current_user_facility_code);
    }
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
    console.log("logged out successfully");
  }
}
