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
  approvalLeaveList: any[] = [];

  constructor() {
    const loggedData = localStorage.getItem('leaveUser');
    if (loggedData !== null) {
      const user = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(user.employeeId);
    }
  }

  ngOnInit() {
    this.loadLeave();
    this.getAllLeaves();
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

  getAllLeaves() {
    this.employeeService.getAllLeaves().subscribe({
      next: (res: any) => {
        if (res.result) {
          this.approvalLeaveList = res.data.filter(
            (m: any) => m.isApproved === null
          );
          console.log(
            'Leave data loaded successfully:',
            this.approvalLeaveList
          );
        } else {
          console.error('Failed to load leave data:', res.message);
        }
      },
      error: (error) => {
        console.error('Error loading leave data:', error);
      },
    });
  }

  approvedLeave(leaveId: number) {
    this.employeeService.approveLeave(leaveId).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert('Leave approved successfully');
          this.getAllLeaves();
        } else {
          console.error('Failed to approve leave:', res.message);
        }
      },
      error: (error) => {
        console.error('Error approving leave:', error);
      },
    });
  }
  rejectedLeave(leaveId: number) {
    this.employeeService.rejectLeave(leaveId).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert('Leave rejected successfully');
          this.getAllLeaves();
        } else {
          console.error('Failed to reject leave:', res.message);
        }
      },
      error: (error) => {
        console.error('Error rejecting leave:', error);
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
            this.loadLeave();
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
