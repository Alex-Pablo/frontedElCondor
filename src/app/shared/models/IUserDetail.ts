
export interface IUserDetailDto {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  profile: string;
  role: string;
  salesOfDay: number;
  salesOfMonth: number;
  status: string;
  last_login: string | null;   // Puede ser null o una fecha en formato ISO
  last_logout: string | null;  // Puede ser null o una fecha en formato ISO
  created_at: string;          // Fecha en formato ISO
  updated_at: string;          // Fecha en formato ISO
  created_by: any;             // Si `created_by` puede ser null, se usa `any` o se especifica un tipo adecuado
}
