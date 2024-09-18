export interface IMenuitem {
  icon: string;
  label: string;
  route: string
  subItems?: IMenuitem[];
}
