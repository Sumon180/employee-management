import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  constructor(private http: HttpClient) {}

  onLogin(object: LoginModel) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login',
      object
    );
  }
}
