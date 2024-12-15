import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-reservas',
  standalone: false,
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.scss']
})
export class ListaReservasComponent {
  reservas: any[] = [];
  fechaFiltro: string = '';

  constructor(private http: HttpClient) {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.http.get<any[]>('/Reservas').subscribe(
      (data) => this.reservas = data,
      (error) => console.error('Error al obtener reservas:', error)
    );
  }

  filtrarReservas() {
    if (!this.fechaFiltro) return;

    this.http.get<any[]>(`/Reservas/byFecha?fecha=${this.fechaFiltro}`).subscribe(
      (data) => this.reservas = data,
      (error) => console.error('Error al filtrar reservas:', error)
    );
  }
}
