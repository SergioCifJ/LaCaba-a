import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../_models/Usuario';
import { RegisterService } from '../_services/register.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  user: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
  };

  confirmarContrasena: string = '';

  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) { }

  onSubmit() {
    if (this.user.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      this.user.contrasena == null;
      this.confirmarContrasena == null;
      return;
    }

    this.registerService.registerUser(this.user).subscribe(
      (response) => {
        alert('Usuario registrado con éxito');
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error al registrar usuario:', error);
      }
    );
  }
}
