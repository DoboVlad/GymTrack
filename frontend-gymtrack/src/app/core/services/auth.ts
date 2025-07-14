import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserModel } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSignal = signal<string | null>(sessionStorage.getItem('token'));
  readonly isLoggedInSignal = computed(() => !!this.tokenSignal());

  constructor(private httpClient: HttpClient) { }

  register(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${environment.apiUrl}/api/users/register`, { user });
  }

  login(email: string, password: string): Observable<{ token: string, user: UserModel }> {
    return this.httpClient.post<{ token: string, user: UserModel }>(`${environment.apiUrl}/api/users/login`, { email, password })
      .pipe(
        tap(response => {
          this.tokenSignal.set(response.token)
          sessionStorage.setItem('token', response.token)
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.tokenSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }
}
