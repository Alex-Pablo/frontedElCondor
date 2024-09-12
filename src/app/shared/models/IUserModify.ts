
export interface IUserModifyDto {
  id: number;
  email: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  profile?: string;
  id_role: number;
  id_estado: number;
}
