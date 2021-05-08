import IUser from './IUser';

interface ISession {
  id?: string;
  usersId: string;
  dayOfTheWeek: string;
  type: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;

  user: IUser;
}

export default ISession;
