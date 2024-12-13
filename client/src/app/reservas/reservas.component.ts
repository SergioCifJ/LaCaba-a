import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../_services/reserva.service';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent {
  reservaForm: FormGroup;

  constructor(private fb: FormBuilder, private reservaService: ReservaService) {
    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      numComensales: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      const reservaData = this.reservaForm.value;
      if (reservaData) {
        this.reservaService.createReserva(reservaData)!.subscribe(
          () => {
            alert('Reserva creada con éxito');
          },
          (error) => {
            console.error('Error al crear la reserva:', error);
          }
        );
      }
    } else {
      console.log('Formulario inválido:', this.reservaForm.errors);
    }
  }
}
