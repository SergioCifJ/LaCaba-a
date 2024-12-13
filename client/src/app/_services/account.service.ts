import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from '../_models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private loginUrl = this.baseUrl + 'account/login';
  private currentUserSource = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
    this.getCurrentUser();  // Asegúrate de cargar el usuario cuando la aplicación se inicia
  }

  login(model: any) {
    return this.http.post<Usuario>(this.loginUrl, model).pipe(
      map((response: Usuario) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSource.next(JSON.parse(user));
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
