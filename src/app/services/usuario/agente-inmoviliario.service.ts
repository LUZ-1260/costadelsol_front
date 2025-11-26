import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../../models/utils/response-data';
import { AgenteInmoviliarioModel } from 'src/app/models/usuario/agente-inmoviliario.model';

@Injectable({
	providedIn: 'root'
})
export class AgenteInmoviliarioService {

	private url = `${environment.apiUrl}/usuarios/agente-inmobiliario/`;

	constructor(private http: HttpClient) { }

	listar(): Observable<ResponseData> {
		return this.http.get<ResponseData>(this.url);
	}

	crear(data: AgenteInmoviliarioModel): Observable<ResponseData> {
		return this.http.post<ResponseData>(this.url, data);
	}

	obtener(id: number): Observable<ResponseData> {
		return this.http.get<ResponseData>(`${this.url}${id}/`);
	}

	actualizar(id: number, data: AgenteInmoviliarioModel): Observable<ResponseData> {
		return this.http.put<ResponseData>(`${this.url}${id}/`, data);
	}

	patch(id: number, data: Partial<AgenteInmoviliarioModel>): Observable<ResponseData> {
		return this.http.patch<ResponseData>(`${this.url}${id}/`, data);
	}

	eliminar(id: number): Observable<ResponseData> {
		return this.http.delete<ResponseData>(`${this.url}${id}/`);
	}
}
