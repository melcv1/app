import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject para mantener el estado actual del usuario
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {
    // Obtener el valor del usuario del localStorage
    const storedUser = localStorage.getItem('currentUser');
    // Inicializar el BehaviorSubject con el valor almacenado o null si no hay nada
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Getter para obtener el valor actual del usuario
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Método para iniciar sesión
  login(username: string, password: string) {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<any>(url, { username, password }).pipe(
      map((user) => {
        // Almacenar el usuario en el localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Actualizar el BehaviorSubject con el nuevo usuario
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  // Método para cerrar sesión
  logout() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('currentUser');
    // Actualizar el BehaviorSubject con null
    this.currentUserSubject.next(null);
    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Verificar si currentUserValue no es nulo y si tiene algún valor
    return (
      !!this.currentUserValue && Object.keys(this.currentUserValue).length > 0
    );
  }
}
