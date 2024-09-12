
export interface IUserReportsDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;

  /**
   * Fecha de creación del usuario
   */
  created_at?: Date;

  /**
   * Fecha de la última actualización del usuario
   */
  updated_at?: Date;

  /**
   * Fecha del último inicio de sesión
   */
  last_login_at?: Date;

  /**
   * Fecha del último cierre de sesión
   */
  last_logout_at?: Date;

  /**
   * Ventas completadas en el mes actual
   */
  completedSalesMonth: number;

  /**
   * Ventas completadas en el año actual
   */
  completedSalesYear: number;

  /**
   * Estado del usuario
   */
  stateUser: string;

}
