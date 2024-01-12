import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authService.logout();
  }

  onSubmit() {
    this.authService
      .login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: (data) => {
          console.log('Login successful', data);
          this.router.navigate(['/today']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.toastr.error('credenciales incorrectas');
        },
      });
  }
}
