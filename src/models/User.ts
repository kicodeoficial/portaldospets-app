interface User {
  id: string;
  name: string;
  cpf_cnpj: string;
  person_type: string;
  date_of_birth?: string;
  sex?: string;
  status: string;
  role: string;
  company_size?: string;
  email: string;
  cellphone: string;
  image_url?: string;
  password: string;
  accept_terms_of_use: boolean;
  type_gateway?: string;
  gateway_reference_id?: string;
  referral_code: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

export default User;
