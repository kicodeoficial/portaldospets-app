interface RecoverPassword {
  id: string;
  expiration_time_in_minutes: number;
  users_id: string;
  code?: string;
  lost_password?: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export default RecoverPassword;
