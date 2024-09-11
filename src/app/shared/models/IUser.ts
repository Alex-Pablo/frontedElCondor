
export interface IUser {
  id: string;
  email: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  profile?: string; // Campo opcional
  role: string;
  estado: string;
  lastLogin?: Date; // Campo opcional
}
