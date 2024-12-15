export interface Usuario {
    id: number,
    nombre: string | null,
    correo: string | null,
    contrasena: string,
    isAdmin: boolean,
}