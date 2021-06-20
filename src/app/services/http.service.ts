import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {environment as env} from "../../environments/environment.prod";
import {APIResponse, Game} from "../Models/Interfaces/interfaces";
import {map} from "rxjs/operators";

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

  getGameDetails(id: string){
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenShots = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
        gameInfoRequest,
      gameTrailersRequest,
      gameScreenShots
    }).pipe(map((resp: any) => {
        return {...resp['gameInfoRequest'],
          screenshots: resp['gameScreenShots']?.results,
          trailers: resp['gameTrailersRequest']?.results
        }
    }))
  }

  getGames(){
    return this.http.get("https://api.rawg.io/api/games?key=c04acbc995ea42309a3f8de7610333a1");
  }
}
