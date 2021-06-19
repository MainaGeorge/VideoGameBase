import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../environments/environment.prod";
import {APIResponse, Game} from "../Models/Interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGamesList(ordering: string,
               search?: string):
    Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);

    if(search){
      params = new HttpParams().set('ordering', ordering)
        .set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params
    })
  }

  getGames(){
    return this.http.get("https://api.rawg.io/api/games?key=c04acbc995ea42309a3f8de7610333a1");
  }
}
