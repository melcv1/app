import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.formData).subscribe({
      next: (data) => {
        console.log('Registro exitoso', data);
        // Manejar la respuesta, como redirigir al usuario a la página de inicio de sesión
      },
      error: (error) => {
        console.error('Registro fallido', error);
        // Manejar el error, como mostrar un mensaje de error al usuario
      },
    });
  }
}
