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
  private readonly baseUrl =
    'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  constructor(private http: HttpClient) {}

  onLogin(payload: LoginModel) {
    return this.http.post(`${this.baseUrl}/Login`, payload);
  }

  getAllEmployee(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/GetEmployees`);
  }

  getAllLeaves(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/GetAllLeaves`);
  }

  approveLeave(leaveId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.baseUrl}/ApproveLeave?id=${leaveId}`
    );
  }

  rejectLeave(leaveId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.baseUrl}/RejectLeave?id=${leaveId}`
    );
  }

  getDept() {
    return this.http
      .get(`${this.baseUrl}/GetDepartments`)
      .pipe(map((res: any) => res.data));
  }

  getRole() {
    return this.http
      .get(`${this.baseUrl}/GetAllRoles`)
      .pipe(map((res: any) => res.data));
  }

  onNewEmployee(payload: INewEmployee) {
    return this.http.post(`${this.baseUrl}/CreateEmployee`, payload);
  }

  onAddLeaveRequest(payload: any) {
    return this.http.post(`${this.baseUrl}/AddLeave`, payload);
  }

  getAllLeaveByEmpId(empId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.baseUrl}/GetAllLeavesByEmployeeId?id=${empId}`
    );
  }
}
