import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormArray, FormControl, FormGroup } from "@angular/forms";
import { AssesmentService } from "../services/assesment.service";
import { AuthenticationService } from "../services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { config } from "../Helpers/constants";
import { RiskAssesment } from "../models/risksModel";

@Component({
  selector: "app-update-assesment",
  templateUrl: "./update-assesment.component.html",
  styleUrls: ["./update-assesment.css"]
})
export class UpdateAssesmentComponent implements OnInit {
  questionForm: FormGroup;
  @Input()
  prevAssessment: RiskAssesment;
  public symptoms: Array<any> = [
    { description: "Fever", value: "Fever" },
    { description: "Fever >38C", value: "Fever >38C" },
    { description: "Cough", value: "Cough" },
    { description: "Sore throat", value: "Sore throat" },
    { description: "Difficulty breathing", value: "Difficulty breathing" },
    { description: "Chills or shakes", value: "Chills or shakes" },
    { description: "Headache", value: "Headache" },
    { description: "Muscle aches", value: "Muscle aches" },
    { description: "Fatigue", value: "Fatigue" },
    { description: "Runny nose", value: "Runny nose" },
    { description: "Joint aches", value: "Joint aches" },
    { description: "Nausea", value: "Nausea" },
    { description: "Diarrhoea", value: "Diarrhoea" },
    { description: "Abdominal/stomach pain", value: "Abdominal/stomach pain" }
  ];
  public exposure_question: Array<any> = [
    {
      description: "Travelled outside Kenya within the last 14 days",
      value: "Travelled outside Kenya within the last 14 days"
    },
    {
      description:
        "Been in contact with someone who has travelled outside Kenya within the last 14 days",
      value:
        "Been in contact with someone who has travelled outside Kenya within the last 14 days"
    },
    {
      description: "Been in contact with someone suspected to be with COVID19",
      value: "Been in contact with someone suspected to be with COVID19"
    }
  ];
  public emergency_symptoms: Array<any> = [
    { description: "Chest pain", value: "Chest pain" },
    { description: "Dizziness", value: "Dizziness" },
    { description: "Very drowsy/lethargic", value: "Very drowsy/lethargic" },
    {
      description: "New shortness of breath",
      value: "New shortness of breath"
    },
    {
      description: "Worsening shortness of breath",
      value: "Worsening shortness of breath"
    },
    {
      description:
        "weakness that impairs your ability to carry out activity for daily living(such as showering, cooking and dressing)",
      value:
        "weakness that impairs your ability to carry out activity for daily living(such as showering, cooking and dressing)"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private assesmentService: AssesmentService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initializeForm();
    console.log("from update page");
    console.log(this.prevAssessment);
  }
  get f_data() {
    return this.questionForm.controls;
  }
  get f_symptoms() {
    return this.questionForm.controls.symptoms as FormArray;
  }
  get f_emergencysymptoms() {
    return this.questionForm.controls.emergency_symptoms as FormArray;
  }
  get f_exposure_history() {
    return this.questionForm.controls.exposure_history as FormArray;
  }
  initializeForm() {
    this.questionForm = this.fb.group({
      fullname: [""],
      age: [""],
      gender: [""],
      phone_number: this.prevAssessment.phone_number,
      location: this.prevAssessment.location_name,
      contact_person_name: [""],
      contact_person_phone_number: [""],
      exposure_history: this.fb.array([]),
      symptoms: this.fb.array([]),
      emergency_symptoms: this.fb.array([])
    });
  }
  onCheckChange(event, arrayName) {
    let formArray: FormArray = this.questionForm.get(arrayName) as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  onUpdate() {
    this.spinner.show();
    let payLoad = {
      developer_username: config.developer_username,
      developer_api_key: config.developer_api_key,
      action: "updateriskassesment",
      id: this.prevAssessment.id,
      full_name: this.f_data.fullname.value,
      age: this.f_data.age.value,
      gender: this.f_data.gender.value,
      phone_number: this.prevAssessment.phone_number,
      location_name: this.prevAssessment.location_name,
      alternative_contact_full_name: this.f_data.contact_person_name.value,
      alternative_contact_phone_number: this.f_data.contact_person_phone_number
        .value,
      exposure_history: this.f_exposure_history.value.toString(),
      symptoms: this.f_symptoms.value.toString(),
      emergency_symptoms: this.f_emergencysymptoms.value.toString(),
      assesed_by: this.authenticationService.getCurrentUserName(),
      hospital_name: this.authenticationService.getFacilityCode()
    };
    console.log(payLoad);
    this.assesmentService.UpdateAssesment(payLoad).subscribe(
      res => {
        this.spinner.hide();
        if (res.body.response_code == 0) {
          this.toastr.success("Assesment Added Successfully");
          this.questionForm.reset();
        } else {
          this.toastr.error("Unable To Submit Assessment");
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Try Again Later", "Server Error");
      }
    );
  }
}
