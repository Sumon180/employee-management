import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee';
import { IEmployee, IEmployeeModel } from '../../model/employee.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [NgClass],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);

  employees: IEmployee[] = [];
  paginatedEmployees: IEmployee[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response: IEmployeeModel) => {
        if (response.result) {
          this.employees = response.data;
          this.totalPages = Math.ceil(
            this.employees.length / this.itemsPerPage
          );
          this.setPaginatedEmployees();
        } else {
          console.error('Failed to fetch employees:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      },
    });
  }

  setPaginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEmployees = this.employees.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPaginatedEmployees();
    }
  }

  paginationRange(): (number | '...')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // how many pages to show around current page
    const range: (number | '...')[] = [];
    let l: number;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 || // always show first page
        i === total || // always show last page
        (i >= current - delta && i <= current + delta) // show pages near current
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  }
}
