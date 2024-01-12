import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<any>(url, { username, password }).pipe(
      map((user) => {

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');
    // Actualizar el BehaviorSubject con null
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return (
      !!this.currentUserValue && Object.keys(this.currentUserValue).length > 0
    );
  }
}
