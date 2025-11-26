import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../../models/utils/response-data';
import { TipoMonedaModel } from '../../models/catalogo/tipo-moneda.model';

@Injectable({
	providedIn: 'root'
})
export class TipoMonedaService {

	private url = `${environment.apiUrl}/catalogo/tipo-moneda/`;
	constructor(private http: HttpClient) { }

	listarTipoMoneda(): Observable<ResponseData> {
		return this.http.get<ResponseData>(this.url);
	}

	crearTipoMoneda(data: TipoMonedaModel): Observable<ResponseData> {
		return this.http.post<ResponseData>(this.url, data);
	}

	obtenerTipoMoneda(id: number): Observable<ResponseData> {
		return this.http.get<ResponseData>(`${this.url}${id}/`);
	}

	actualizarTipoMoneda(id: number, data: TipoMonedaModel): Observable<ResponseData> {
		return this.http.put<ResponseData>(`${this.url}${id}/`, data);
	}

	patchTipoMoneda(id: number, data: Partial<TipoMonedaModel>): Observable<ResponseData> {
		return this.http.patch<ResponseData>(`${this.url}${id}/`, data);
	}

	eliminarTipoMoneda(id: number): Observable<ResponseData> {
		return this.http.delete<ResponseData>(`${this.url}${id}/`);
	}
}
