interface IRecoverPassword {
  id: string;
  expirationTimeInMinutes: number;
  usersId: string;
  code?: string;
  lostPassword?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export default IRecoverPassword;
