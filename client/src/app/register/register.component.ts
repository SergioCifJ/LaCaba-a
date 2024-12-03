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
    nombre: null,
    correo: null,
    contrasena: '',
  };

  confirmarContrasena: string = '';

  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) { }

  onSubmit() {
    if (!this.user.nombre || !this.user.correo || !this.user.contrasena || !this.confirmarContrasena) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (this.user.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      this.user.contrasena = '';
      this.confirmarContrasena = '';
      return;
    }

    this.registerService.registerUser(this.user).subscribe(
      (response) => {
        alert('Usuario registrado con éxito');
        this.user.nombre = null;  
        this.user.correo = null;
        this.user.contrasena = '';
        this.confirmarContrasena = '';
      },
      (error) => {
        if (error === 'El nombre de usuario ya está en uso.' || error === 'El correo electrónico ya está en uso.') {
          this.errorMessage = error;
        } else {
          this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente más tarde.';
        }
        alert('Error al registrar usuario:' + error);
      }
    );
  }
}
