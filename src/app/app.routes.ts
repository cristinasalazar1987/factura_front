import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FacturaFormComponent } from './factura-form/factura-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'factura', component: FacturaFormComponent },
];