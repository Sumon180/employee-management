import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  currentYear: number = new Date().getFullYear();

  router = inject(Router);

  logout() {
    localStorage.removeItem('leaveUser');
    this.router.navigateByUrl('/login');
  }
}
