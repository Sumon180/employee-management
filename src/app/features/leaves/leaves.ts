import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leaves',
  imports: [NgClass, CommonModule, RouterLink],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class Leaves {
  selectedTab: string = 'All';

  leaveRequests = [
    {
      id: 1,
      name: 'John Doe',
      leaveType: 'Sick Leave',
      days: 3,
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      leaveType: 'Casual Leave',
      days: 2,
      status: 'Approved',
    },
    {
      id: 3,
      name: 'Mark Lee',
      leaveType: 'Earned Leave',
      days: 5,
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Emma Watson',
      leaveType: 'Maternity Leave',
      days: 30,
      status: 'Approved',
    },
  ];

  get filteredLeaves() {
    return this.selectedTab === 'All'
      ? this.leaveRequests
      : this.leaveRequests.filter((req) => req.status === this.selectedTab);
  }

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}
