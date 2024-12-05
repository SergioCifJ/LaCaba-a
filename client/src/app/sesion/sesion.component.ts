import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-sesion',
  standalone: false,
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Crear el formulario reactivo con los campos de correo y contraseña
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, ingresa los campos correctamente.';
      return;
    }

    // Llamada al servicio para iniciar sesión
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => {
        this.errorMessage = '';
        this.router.navigate(['/home']);  // Redirige al usuario después de iniciar sesión
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    );
  }

  // Getter para acceder a los controles del formulario
  get f() {
    return this.loginForm.controls;
  }
}
