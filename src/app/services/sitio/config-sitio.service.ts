import { ResponseData } from '../../models/utils/response-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigSitioModel } from '../../models/sitio/config-sitio.model';

@Injectable({
	providedIn: 'root'
})
export class ConfigSitioService {

	private url: string = `${environment.apiUrl}/sitio/config-sitio/`;

	constructor(private http: HttpClient) { }

	listarConfiguracion(): Observable<ResponseData> {
		return this.http.get<ResponseData>(this.url);
	}

	crearConfiguracion(data: ConfigSitioModel): Observable<ResponseData> {
		return this.http.post<ResponseData>(this.url, data);
	}

	obtenerConfiguracion(id: number): Observable<ResponseData> {
		return this.http.get<ResponseData>(`${this.url}${id}/`);
	}

	actualizarConfiguracion(id: number, data: ConfigSitioModel): Observable<ResponseData> {
		return this.http.put<ResponseData>(`${this.url}${id}/`, data);
	}

	patchConfiguracion(id: number, data: Partial<ConfigSitioModel>): Observable<ResponseData> {
		return this.http.patch<ResponseData>(`${this.url}${id}/`, data);
	}

	eliminarConfiguracion(id: number): Observable<ResponseData> {
		return this.http.delete<ResponseData>(`${this.url}${id}/`);
	}
}
