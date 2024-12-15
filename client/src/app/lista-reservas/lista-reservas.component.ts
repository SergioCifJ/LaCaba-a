import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-lista-reservas',
  standalone: false,
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.scss']
})
export class ListaReservasComponent {
  reservas: any[] = [];
  fechaFiltro: string = '';
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.http.get<any[]>(this.baseUrl + 'reservas').subscribe(
      (data) => {
        this.reservas = data;
        this.reservas.sort((a, b) => {
          const fechaA = new Date(a.fecha + ' ' + a.hora);
          const fechaB = new Date(b.fecha + ' ' + b.hora);
          return fechaA.getTime() - fechaB.getTime();
        });
      },
      (error) => console.error('Error al obtener reservas:', error)
    );
  }
  

  filtrarReservas() {
    if (!this.fechaFiltro) return;

    this.http.get<any[]>(this.baseUrl + `Reservas/byFecha?fecha=${this.fechaFiltro}`).subscribe(
      (data) => this.reservas = data,
      (error) => console.error('Error al filtrar reservas:', error)
    );
  }
}