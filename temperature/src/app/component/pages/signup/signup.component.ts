import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  // Vérifie que password === confirmPassword
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.toastr.error('Email ou mot de passe non conforme', 'Erreur', {
        timeOut: 3000,
        progressBar: true,
      });
      return;
    }
  
    const { email, password } = this.signupForm.value;
  
    this.authService.signup(email, password).subscribe({
      next: () => {
        this.toastr.success('Compte créé avec succès!', 'Succès', {
          timeOut: 3000,
          progressBar: true,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || "Erreur lors de l'inscription", 'Erreur', {
          timeOut: 3000,
          progressBar: true,
        });
      },
    });
  }
  
  
  getEmailError(): string {
    const emailCtrl = this.signupForm.get('email');
    if (!emailCtrl) return '';
  
    if (emailCtrl.hasError('required')) {
      return "L'email est requis";
    }
    if (emailCtrl.hasError('email')) {
      return "L'email n'est pas valide";
    }
    return '';
  }
  
  getPasswordError(): string {
    const passwordCtrl = this.signupForm.get('password');
    if (!passwordCtrl) return '';
  
    if (passwordCtrl.hasError('required')) {
      return 'Le mot de passe est requis';
    }
    if (passwordCtrl.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return '';
  }
  
  
}
