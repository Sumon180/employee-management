import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../core/services/employee';
import { AsyncPipe } from '@angular/common';
import { INewEmployee } from '../../../model/employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  templateUrl: './new-employee.html',
  styleUrls: ['./new-employee.css'],
  imports: [AsyncPipe, FormsModule],
})
export class NewEmployee implements OnInit {
  newEmployee: INewEmployee = new INewEmployee();

  employeeService = inject(EmployeeService);

  deptList: Observable<any[]> = this.employeeService.getDept();
  roleList: Observable<any[]> = this.employeeService.getRole();

  ngOnInit(): void {
    // Already initialized above, unless you need to reassign
  }

  onRegister() {
    const payload = {
      ...this.newEmployee,
      deptId: +this.newEmployee.deptId,
    };

    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    this.employeeService.onRegister(payload).subscribe({
      next: (res: any) => {
        if (res?.result) {
          alert('Successfully created' + res.message);
        } else {
          alert('Failed: ' + res.message);
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Registration failed. Server error.');
      },
    });
  }
}
