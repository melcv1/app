import { Routes } from '@angular/router';
import { TodayComponent } from './features/weather/pages/today/today.component';
import { WeekComponent } from './features/weather/pages/week/week/week.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'today', component: TodayComponent, canActivate: [AuthGuard] },
  { path: 'week', component: WeekComponent, canActivate: [AuthGuard] },
];
