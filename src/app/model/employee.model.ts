export class LoginModel {
  constructor(
    public emailId: string = 'www@gmail.com',
    public password: string = '112233'
  ) {}
}

export interface IEmployee {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
}
export interface IEmployeeModel {
  message: string;
  result: boolean;
  data: IEmployee[];
}
