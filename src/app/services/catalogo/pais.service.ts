import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../../models/utils/response-data';
import { PaisModel } from '../../models/catalogo/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url = `${environment.apiUrl}/catalogo/pais/`;

  constructor(private http: HttpClient) {}

  listarPais(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.url);
  }

  crearPais(data: PaisModel): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.url, data);
  }

  obtenerPais(id: number): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.url}${id}/`);
  }

  actualizarPais(id: number, data: PaisModel): Observable<ResponseData> {
    return this.http.put<ResponseData>(`${this.url}${id}/`, data);
  }

  patchPais(id: number, data: Partial<PaisModel>): Observable<ResponseData> {
    return this.http.patch<ResponseData>(`${this.url}${id}/`, data);
  }

  eliminarPais(id: number): Observable<ResponseData> {
    return this.http.delete<ResponseData>(`${this.url}${id}/`);
  }
}
