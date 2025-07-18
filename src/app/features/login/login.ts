import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../model/employee.model';
import { Employee } from '../../core/services/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObject: LoginModel = new LoginModel();
  isLoading = false;

  employeeService = inject(Employee);
  router = inject(Router);

  onLogin() {
    this.isLoading = true;

    this.employeeService.onLogin(this.loginObject).subscribe({
      next: (response: any) => {
        if (response.result) {
          console.log('Login successful:', response);
          localStorage.setItem('leaveUser', JSON.stringify(response.data));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Login failed:' + response.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);
        // Handle login failure, e.g., show an error message
      },
    });
  }
}
