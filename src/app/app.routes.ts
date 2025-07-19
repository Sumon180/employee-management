import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Layout } from './layouts/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Employee } from './features/employee/employee';
import { Leaves } from './features/leaves/leaves';
import { NewEmployee } from './features/employee/new-employee/new-employee';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'employee',
        component: Employee,
      },
      {
        path: 'employee/new',
        component: NewEmployee,
      },
      {
        path: 'leaves',
        component: Leaves,
      },
    ],
  },
];
