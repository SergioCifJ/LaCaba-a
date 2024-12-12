import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = environment.apiUrl;
  private apiUrl = this.baseUrl + 'users/register';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    console.log(user);
    return this.http.post(this.apiUrl, user).pipe(
      catchError((error) => {
        if (error.status === 400) {
          return throwError(error.error);
        }
        return this.handleError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del cliente:', error.error.message);
    } else {
      console.error(
        `Código de error del servidor: ${error.status}, ` +
        `Mensaje: ${error.message}`
      );
    }

    return throwError('Error al registrar el usuario. Intenta nuevamente más tarde.');
  }
}
