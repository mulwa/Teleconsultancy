import { Component, OnInit, Input } from "@angular/core";
import { Risks, RiskAssesment } from "src/app/models/risksModel";

@Component({
  selector: "app-assesment-result",
  templateUrl: "./assesment-result.component.html",
  styleUrls: ["./assesment-result.component.css"]
})
export class AssesmentResultComponent implements OnInit {
  @Input()
  prevAssessment: RiskAssesment[];

  constructor() {}
  convertToArray(data: String) {
    return data.split(",");
  }

  ngOnInit() {}
}
