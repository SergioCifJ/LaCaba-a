import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../_services/register.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    nombre: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: ''
  };

  constructor(private registerService: RegisterService, private router: Router) {}

  onSubmit() {
    if (this.user.contrasena !== this.user.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.registerService.registerUser(this.user).subscribe(
      (response) => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error al registrar usuario: ' + error.error);
      }
    );
  }
}
