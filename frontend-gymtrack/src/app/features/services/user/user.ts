import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserModel } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getLoggedInUser() {
    return this.httpClient.get<{ user: UserModel }>(`${environment.apiUrl}/api/users/getLoggedInUser`);
  }
}
