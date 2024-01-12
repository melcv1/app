import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService
      .login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: (data) => {
          console.log('Login successful', data);
          // Manejar la respuesta, como almacenar el token, etc.
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
  }
}
