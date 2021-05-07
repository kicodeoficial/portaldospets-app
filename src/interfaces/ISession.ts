import IUser from './IUser';

interface ISession {
  id?: string;
  users_id?: string;
  day_of_the_week?: string;
  type?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;

  user: IUser;
}

export default ISession;
