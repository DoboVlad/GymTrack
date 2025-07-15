import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BodyCompositionModel } from '../../../models/body-composition';

@Injectable({
  providedIn: 'root'
})
export class BodyCompositionService {

  constructor(private httpClient: HttpClient) {}

  createBodyComposition(bodyComposition: BodyCompositionModel) {
    return this.httpClient.post<BodyCompositionModel>(`${environment.apiUrl}/api/body-composition`, bodyComposition);
  }

  getBodyCompositions() {
    return this.httpClient.get<BodyCompositionModel[]>(`${environment.apiUrl}/api/body-composition`);
  }

  deleteBodyComposition(id: string) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/api/body-composition/${id}`);
  }

  updateBodyComposition(bodyComposition: BodyCompositionModel) {
    return this.httpClient.put<BodyCompositionModel>(`${environment.apiUrl}/api/body-composition/${bodyComposition.id}`, bodyComposition);
  }
}
