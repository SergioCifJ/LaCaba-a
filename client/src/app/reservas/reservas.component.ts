import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ReservaService } from '../_services/reserva.service';
import { Router } from '@angular/router';

// Función personalizada para validar que la fecha no sea anterior al día actual
function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null; // Si no hay valor, se maneja con el validador 'required'
    }
    const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return selectedDate < today ? { pastDate: true } : null;
  };
}

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
      fecha: ['', [Validators.required, futureDateValidator()]],
      hora: ['', Validators.required],
      numComensales: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      const reservaData = this.reservaForm.value;

      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (!user) {
        this.errorReserva = 'Por favor, inicie sesión para realizar una reserva.';
        return;
      }

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
    } else {
      console.log('Formulario inválido:', this.reservaForm.errors);
    }
  }
}
