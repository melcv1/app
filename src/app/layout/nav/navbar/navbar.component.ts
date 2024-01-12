import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isUserMenuOpen = false;

  constructor(private router: Router) {}

  // Función para hacer logout
  logout() {
    this.router.navigate(['/login']);
  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
