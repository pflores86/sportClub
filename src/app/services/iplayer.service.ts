import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class IPlayerService {
  constructor(private http: HttpClient) {}

  getPlayers() : Observable<any>{
      return this.http.get('assets/data/data.json');
  }
  getPlayer(id : number) : Observable<any>{

    return this.http.get('assets/data/data.json')
    .map(res => JSON.parse(JSON.stringify(res)).filter(x => x.id === id));
  }
}