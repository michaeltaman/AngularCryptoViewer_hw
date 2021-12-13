import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../models/Coin';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  // baseURL = `${environment.mainUrlAPI}coin`;
  baseURL = `${environment.mainUrlAPI}`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.baseURL).pipe(
      map((rawResponse: any) => {
        //console.log([...rawResponse.data]);
        return [...rawResponse.data];
    }));
  }

  getById(id: number): Observable<Coin> {
    return this.http.get<Coin>(`${this.baseURL}/${id}`);
  }

  getByAlunoId(id: number): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.baseURL}/ByAluno/${id}`);
  }

  post(coin: Coin) {
    return this.http.post(this.baseURL, Coin);
  }

  put(coin: Coin) {
    return this.http.put(`${this.baseURL}/${coin.id}`, Coin);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
