
export interface IUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  profile?: string; // url de la imagne
  phoneNumber: string;
  role: string;
  id_role: number;
  status: string;
  last_login?: Date; // Campo opcional
}
