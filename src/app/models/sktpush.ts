export interface STKPush {
  response_code: number;
  response_message: string;
  access_token: string;
  merchant_request_id: string;
  checkout_request_id: string;
  request_response_code: string;
  response_description: string;
  customer_message: string;
  msisdn: string;
  logger_response: string;
}
