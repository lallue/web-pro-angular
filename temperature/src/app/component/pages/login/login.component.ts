import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.toastr.success('Connexion réussie !', 'Succès', { 
          timeOut: 3000,
          progressBar: true
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        this.toastr.error('Identifiants invalides', 'Erreur', { 
          timeOut: 3000,
          progressBar: true
        });
        this.errorMessage = 'Identifiants invalides';
      }
    });
  }
  // Méthode pour rediriger vers la page d'inscription
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
