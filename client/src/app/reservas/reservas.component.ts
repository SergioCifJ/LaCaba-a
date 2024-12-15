import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../_services/reserva.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent {
  reservaForm: FormGroup;
  errorReserva: string | null = null;

  constructor(private fb: FormBuilder, private reservaService: ReservaService, private router: Router) {
    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      numComensales: ['', [Validators.required, Validators.min(1)]],
      
    });
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      const reservaData = this.reservaForm.value;

      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (reservaData && user) {
        reservaData.usuario = user;

        this.reservaService.createReserva(reservaData)!.subscribe(
          () => {
            this.errorReserva = null;
            this.reservaForm.reset();
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error al crear la reserva:', error);
            if (error.status === 400) {
              this.errorReserva = 'Ya existe una reserva para la fecha y hora seleccionadas.';
            } else {
              this.errorReserva = 'Error al crear la reserva. Por favor, inténtelo nuevamente.';
            }
          }
        );
      }
    } else {
      console.log('Formulario inválido:', this.reservaForm.errors);
    }
  }
}
