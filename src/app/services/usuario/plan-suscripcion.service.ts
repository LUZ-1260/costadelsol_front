import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../../models/utils/response-data';
import { PlanSuscripcionModel } from 'src/app/models/usuario/plan-suscripcion.model';


@Injectable({
	providedIn: 'root'
})

export class PlanSuscripcionService {

	private url = `${environment.apiUrl}/usuarios/plan-suscripcion/`;
	constructor(private http: HttpClient) { }

	listarPlanSuscripcion(): Observable<ResponseData> {
		return this.http.get<ResponseData>(this.url);
	}

	crearPlanSuscripcion(data: PlanSuscripcionModel): Observable<ResponseData> {
		return this.http.post<ResponseData>(this.url, data);
	}

	obtenerPlanSuscripcion(id: number): Observable<ResponseData> {
		return this.http.get<ResponseData>(`${this.url}${id}/`);
	}

	actualizarPlanSuscripcion(id: number, data: PlanSuscripcionModel): Observable<ResponseData> {
		return this.http.put<ResponseData>(`${this.url}${id}/`, data);
	}

	patchPlanSuscripcion(id: number, data: Partial<PlanSuscripcionModel>): Observable<ResponseData> {
		return this.http.patch<ResponseData>(`${this.url}${id}/`, data);
	}

	eliminarPlanSuscripcion(id: number): Observable<ResponseData> {
		return this.http.delete<ResponseData>(`${this.url}${id}/`);
	}
}
