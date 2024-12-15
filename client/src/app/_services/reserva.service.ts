import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../_models/Reserva';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createReserva(reserva: Reserva) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;

    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl}reservas/reservar`, reserva, { headers });
  }

}
