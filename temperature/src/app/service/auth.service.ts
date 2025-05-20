import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://temp.3il-rodez-projets.site/api'; // L'URL de ton API backend

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  // Méthode pour s'inscrire
  signup(email: string, password: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/signup`, { email, password });
  }

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Méthode pour enregistrer un token dans le localStorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Méthode pour récupérer le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  // Mise à jour de l'email ou du mot de passe de l'utilisateur connecté
updateUser(email?: string, password?: string) {
  const body: any = {};
  if (email) body.email = email;
  if (password) body.password = password;

  return this.http.put<{ message: string, user: any }>(
    `${this.apiUrl}/user`,
    body,
    {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    }
  );
}
}
