export interface RiskAssesment {
  full_name: string;
  id?: string;
  age: string;
  gender: string;
  phone_number: string;
  alternative_contact_full_name: string;
  alternative_contact_phone_number: string;
  lat: string;
  lng: string;
  location_name: string;
  exposure_history: string;
  symptoms: string;
  emergency_symptoms: string;
  assesed_by: string;
  hospital_name: string;
  can_edit: string;
  assesment_date: string;
}

export interface Risks {
  response_code: number;
  response_message: string;
  risk_assesments: RiskAssesment[];
}
