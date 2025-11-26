import { ResponseData } from '../../models/utils/response-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeroModel } from '../../models/sitio/hero.model';

@Injectable({
	providedIn: 'root'
})
export class HeroService {

	private url: string = `${environment.apiUrl}/sitio/hero/`;

	constructor(private http: HttpClient) { }

	listarHeroes(): Observable<ResponseData> {
		return this.http.get<ResponseData>(this.url);
	}
	/*
	  crearHero(data: HeroModel): Observable<ResponseData> {
		return this.http.post<ResponseData>(this.url, data);
	  }*/

	crearHero(data: FormData): Observable<ResponseData> {
		return this.http.post<ResponseData>(this.url, data);
	}

	actualizarHero(id: number, data: FormData): Observable<ResponseData> {
		return this.http.put<ResponseData>(`${this.url}${id}/`, data);
	}


	obtenerHero(id: number): Observable<ResponseData> {
		return this.http.get<ResponseData>(`${this.url}${id}/`);
	}
	/*
	  actualizarHero(id: number, data: HeroModel): Observable<ResponseData> {
		return this.http.put<ResponseData>(`${this.url}${id}/`, data);
	  }
	*/
	
	patchHero(id: number, data: Partial<HeroModel>): Observable<ResponseData> {
		return this.http.patch<ResponseData>(`${this.url}${id}/`, data);
	}

	eliminarHero(id: number): Observable<ResponseData> {
		return this.http.delete<ResponseData>(`${this.url}${id}/`);
	}
}
