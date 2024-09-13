import { ISale } from "./ISale";
import { IUserReportsDto } from "./IUserReports";

export interface IUserDetailDto {
  user: IUserReportsDto;
  latest_sales: ISale[];
}
