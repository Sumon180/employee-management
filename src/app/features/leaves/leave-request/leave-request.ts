import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  imports: [NgClass, FormsModule, ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequest implements OnInit {
  employeeService = inject(EmployeeService);

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(1),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null),
  });

  leaveList: any[] = [];

  constructor() {
    const loggedData = localStorage.getItem('leaveUser');
    if (loggedData !== null) {
      const user = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(user.employeeId);
    }
  }

  ngOnInit() {
    this.loadLeave();
  }

  loadLeave() {
    const empId = this.leaveForm.controls['employeeId'].value;
    this.employeeService.getAllLeaveByEmpId(empId).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.leaveList = res.data;
          console.log('Leave data loaded successfully:', this.leaveList);
        } else {
          console.error('Failed to load leave data:', res.message);
        }
      },
      error: (error) => {
        console.error('Error loading leave data:', error);
      },
    });
  }

  onSubmitLeave() {
    if (this.leaveForm.valid) {
      const formValue = this.leaveForm.value;
      this.employeeService.onAddLeaveRequest(formValue).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert('Leave request submitted successfully');
            this.leaveForm.reset();
          } else {
            console.error('Failed to submit leave request:', res.message);
          }
        },
        error: (error) => {
          console.error('Error submitting leave request:', error);
        },
      });
    } else {
      alert('Please fill in all required fields');
    }
  }
}
