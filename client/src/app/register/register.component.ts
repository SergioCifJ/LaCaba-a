import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../_services/register.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Crear el formulario reactivo
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('contrasena')?.value;
    const confirmarContrasena = group.get('confirmarContrasena')?.value;
    return password === confirmarContrasena ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    console.log(this.registerForm.value);
    this.registerService.registerUser(this.registerForm.value).subscribe(
      (response) => {
        this.errorMessage = '';
        alert('Usuario registrado con éxito');
        this.registerForm.reset();
      },
      (error) => {
        if (error === 'El nombre de usuario ya está en uso.' || error === 'El correo electrónico ya está en uso.') {
          this.errorMessage = error;
        } else {
          this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente más tarde.';
        }
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }
}
