import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

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
  ) { }

  ngOnInit(): void {
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
  
    console.log('Formulario enviado con los datos:', this.loginForm.value);
  
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => {
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    );
  }
  

  get f() {
    return this.loginForm.controls;
  }
}
