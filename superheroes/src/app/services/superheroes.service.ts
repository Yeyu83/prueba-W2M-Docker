import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Superheroe } from '../interfaces/superheroe';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getSuperheroes(): Observable<any> {
    return this._httpClient.get<Superheroe[]>(`${ environment.api }/superheroes`);
  }

  public addSuperheroe(superheroe: Superheroe): Observable<any> {
    return this._httpClient.post<Superheroe>(`${ environment.api }/superheroes`, superheroe);
  }

  public editSuperheroe(superheroe: Superheroe): Observable<any> {
    return this._httpClient.patch<Superheroe>(`${ environment.api }/superheroes/${ superheroe.id }`, superheroe);
  }

  public deleteSuperheroe(superheroeId: number): Observable<any> {
    return this._httpClient.delete<Superheroe>(`${ environment.api }/superheroes/${ superheroeId }`);
  }

}
