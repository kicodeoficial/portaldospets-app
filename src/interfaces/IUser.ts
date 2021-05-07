interface User {
  id?: string;
  name?: string;
  cpfCnpj?: string;
  personType?: string;
  dateOfBirth?: string;
  sex?: string;
  status?: string;
  role?: string;
  companySize?: string;
  email?: string;
  cellphone?: string;
  imageUrl?: string;
  password?: string;
  acceptTermsOfUse?: boolean;
  typeGateway?: string;
  gatewayReferenceId?: string;
  referralCode?: string;
  balance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default User;
