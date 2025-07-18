import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee';
import { IEmployee, IEmployeeModel } from '../../model/employee.model';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);

  employees: IEmployee[] = [];

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response: IEmployeeModel) => {
        console.log(response.data);
        if (response.result) {
          this.employees = response.data;
        } else {
          console.error('Failed to fetch employees:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      },
    });
  }
}
