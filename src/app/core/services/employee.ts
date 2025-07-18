import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeeModel, LoginModel } from '../../model/employee.model';
import { Observable } from 'rxjs';

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

  getAllEmployee(): Observable<IEmployeeModel> {
    return this.http.get<IEmployeeModel>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees'
    );
  }
}
