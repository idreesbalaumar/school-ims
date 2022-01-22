import { Role } from './role';

export class User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  avatar?: string = 'avatar-s-3.jpg';
  role: Role;
  token: string;
  accessToken?: string;
}
