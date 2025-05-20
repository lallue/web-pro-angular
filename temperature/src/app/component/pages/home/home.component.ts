import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemperatureService } from 'src/app/service/TemperatureService';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  url = '';
  error = '';
  isAuthenticated = false;
  updateData = {
    email: '',
    password: ''
  };
  

  constructor(
    public router: Router,
    private temperatureService: TemperatureService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    // Vérifier si l'utilisateur est connecté dès le chargement du composant
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Méthode pour se déconnecter
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Méthode pour valider l'URL
  checkUrl(): void {
    const trimmedUrl = this.url.trim();

    this.temperatureService.getTemperature(trimmedUrl).subscribe(
      () => {
        this.error = '';
        localStorage.setItem('serverUrl', trimmedUrl);
        this.router.navigate(['/temperature']);
        this.toastr.success('URL validée et température récupérée!', 'Succès', {
          timeOut: 3000,
          progressBar: true,
        });
      },
      (err: any) => {
        this.error = err.message || 'Erreur inconnue';
        this.toastr.error('Accès refusé ou URL invalide', 'Erreur', {
          timeOut: 3000,
          progressBar: true,
        });
      }
    );
  }

  updateUser(): void {
    this.authService.updateUser(
      this.updateData.email || undefined,
      this.updateData.password || undefined
    ).subscribe({
      next: (res) => {
        this.toastr.success('Informations mises à jour avec succès', 'Succès');
        // Optionnel : si email a changé, forcer la déconnexion pour sécurité
        if (this.updateData.email) {
          this.authService.logout();
          this.toastr.info('Veuillez vous reconnecter avec votre nouvel email.', 'Déconnexion');
        }
        this.updateData = { email: '', password: '' };
      },
      error: (err) => {
        this.toastr.error('Erreur lors de la mise à jour', 'Erreur');
        console.error(err);
      }
    });
  }

  onKonamiActivated() {
    this.toastr.success('Konami Code activé ! 🎉', 'Succès', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true
    });
  }
}
