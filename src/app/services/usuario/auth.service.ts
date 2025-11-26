import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsuarioModel , Auth, TokenCustom} from 'src/app/models/seguridad/usuario.models';
import { ResponseData } from '../../models/utils/response-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  private _authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this._authenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginUser(data: Auth): Observable<TokenCustom> {
    if (this.verificarToken()) {
      return throwError(() => new Error('Usuario ya se encuentra autenticado'));
    }

    return this.http.post<TokenCustom>(`${this.apiUrl}/login/`, data).pipe(
      switchMap((response: TokenCustom) => {
        localStorage.setItem('tkn', response.access);
        localStorage.setItem('tkn-refresh', response.refresh);
        this._authenticatedSubject.next(true);
        return of(response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('Credenciales inválidas'));
        } else {
          return throwError(() => new Error('Error de autenticación'));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('tkn');
    localStorage.removeItem('tkn-refresh');
    this._authenticatedSubject.next(false);
    this.router.navigate(['login']);
  }

  public accessToken(): string | null {
    return localStorage.getItem('tkn');
  }

  public verificarToken(): boolean {
    return !!localStorage.getItem('tkn');
  }

  public getUsuarioProfile(): Observable<ResponseData[]> {
    const token = localStorage.getItem('tkn') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseData[]>(`${this.apiUrl}/usuarios/perfil-usuario/`, { headers });
  }
  /*
    public crearUsuario(data: UsuarioModel): Observable<ResponseData> {
      return this.http.post<ResponseData>(`${this.apiUrl}/user/usuario/`, data);
    }*/

  public postUsuario(data: UsuarioModel): Observable<ResponseData> {
    const token = localStorage.getItem('tkn') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ResponseData>(`${this.apiUrl}/usuario/`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('No se pudo crear el usuario'));
      })
    );
  }
  /*
    public getUsuarioProfileById(id: number): Observable<ResponseData> {
      const token = localStorage.getItem('tkn') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<ResponseData>(`${this.apiUrl}/usuarios/perfil-usuario/${id}/`, { headers });
    }

    public postUsuarioProfile(data: UsuarioModel): Observable<UsuarioModel> {
      const token = localStorage.getItem('tkn') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<UsuarioModel>(`${this.apiUrl}/usuarios/perfil-usuario/`, data, { headers });
    }

    public actualizarUsuarioProfile(id: number, data: UsuarioModel): Observable<any> {
      const token = localStorage.getItem('tkn') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<UsuarioModel>(`${this.apiUrl}/usuarios/perfil-usuario/${id}/`, data, { headers });
    }

    public deleteUsuarioProfile(id: number): Observable<any> {
      const token = localStorage.getItem('tkn') || '';
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete<any>(`${this.apiUrl}/usuarios/perfil-usuario/${id}/`, { headers });
    }
  */

}
