import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {APIResponse, Game} from "../../Models/Interfaces/interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: string = "";
  public games: Array<Game>;
  constructor(private httpService:HttpService,
              private activatedRoute: ActivatedRoute) {
    this.games = new Array<Game>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit')
      }
    })
  }

  private searchGames(sort: string, searchTerm?:string) {
    this.httpService
      .getGamesList(sort, searchTerm)
      .subscribe( (gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      })

    // this.httpService.getGames().subscribe(res => console.log(res), error => console.log(error));
  }
}
