import { Usuario } from "./Usuario";

export type Hora = '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00' | '19:00' | '20:00' | '21:00';

export interface Reserva {
    id: number,
    fecha: Date,
    hora: Hora,
    usuario: Usuario,
}