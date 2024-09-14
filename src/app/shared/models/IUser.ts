
export interface IUser {
  id: string;
  email: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  profile?: string; // url de la imagne
  role: string;
  estado: string;
  last_Login?: Date; // Campo opcional
}
