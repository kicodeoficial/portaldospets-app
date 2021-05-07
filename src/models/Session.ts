import User from './User';

interface Session {
  id?: string;
  users_id: string;
  day_of_the_week: string;
  type: string;
  token: string;
  created_at: Date;
  updated_at: Date;

  user: User;
}

export default Session;
