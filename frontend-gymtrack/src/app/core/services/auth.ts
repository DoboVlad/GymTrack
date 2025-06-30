import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../features/user/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/api/users/register`, { user });
  }
}
