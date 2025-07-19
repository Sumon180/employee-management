import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  INewEmployee,
  LoginModel,
} from '../../model/employee.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  onLogin(object: LoginModel) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login',
      object
    );
  }

  getAllEmployee(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees'
    );
  }

  getDept() {
    return this.http
      .get(
        'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments'
      )
      .pipe(map((res: any) => res.data));
  }

  getRole() {
    return this.http
      .get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles')
      .pipe(map((res: any) => res.data));
  }

  onRegister(object: INewEmployee) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee',
      object
    );
  }
}
