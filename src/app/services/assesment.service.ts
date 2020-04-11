import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../Helpers/constants";
import { Risks } from "../models/risksModel";
import { UpdateRisk } from "../models/updateRisk";
import { Payment } from "../models/payment";
import { STKPush } from "../models/sktpush";

@Injectable({
  providedIn: "root"
})
export class AssesmentService {
  constructor(private http: HttpClient) {}

  getUserRiskAssesment(identifier: String) {
    let body = {
      developer_username: config.developer_username,
      developer_api_key: config.developer_api_key,
      action: "searchriskassesment",
      identifier: identifier
    };
    return this.http.post<Risks>(`${config.apiUrl}riskassesment`, body, {
      observe: "response"
    });
  }
  getAllRiskAssesment(identifier: String) {
    let body = {
      developer_username: config.developer_username,
      developer_api_key: config.developer_api_key,
      action: "getallriskassesments",
      identifier: identifier
    };
    return this.http.post<Risks>(`${config.apiUrl}riskassesment`, body, {
      observe: "response"
    });
  }
  postNewRiskAssesment(payload: any) {
    return this.http.post<Risks>(`${config.apiUrl}riskassesment`, payload, {
      observe: "response"
    });
  }
  UpdateAssesment(payload: any) {
    console.log(`url: ${config.apiUrl}riskassesment`);
    return this.http.post<UpdateRisk>(
      `${config.apiUrl}riskassesment`,
      payload,
      {
        observe: "response"
      }
    );
  }
  initiatePayment(payload: any) {
    return this.http.post<STKPush>(`${config.apiUrl}riskassesment`, payload, {
      observe: "response"
    });
  }
  searchPayment(payload: any) {
    return this.http.post<Payment>(`${config.apiUrl}riskassesment`, payload, {
      observe: "response"
    });
  }
}
