import { Routes } from '@angular/router';
import { TodayComponent } from './features/weather/pages/today/today.component';
import { WeekComponent } from './features/weather/pages/week/week/week.component';

export const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'today',  component: TodayComponent },
  { path: 'week',  component: WeekComponent },

];
