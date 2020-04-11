export interface Transaction {
  merchant: string;
  service: string;
  direction: string;
  source_country_code: string;
  source_name: string;
  source_account_number: string;
  destination_type: string;
  destination_country_code: string;
  destination_name: string;
  destination_mobile_number: string;
  destination_wallet_name: string;
  destination_bank_code: string;
  destination_branch_code: string;
  destination_account_number: string;
  transfer_type: string;
  transfer_amount: string;
  transfer_currency_code: string;
  transfer_reference: string;
  transfer_date: any;
  transfer_description: string;
  transaction_id: string;
  status: string;
  update_date: string;
}

export interface Payment {
  response_code: number;
  response_message: string;
  transactions: Transaction[];
}
