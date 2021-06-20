import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {APIResponse, Game} from "../../Models/Interfaces/interfaces";
import {Subscribable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = "";
  public games: Array<Game>;
  routeSub: Subscription | undefined;
  activatedRouteSub: Subscription | undefined
  constructor(private httpService:HttpService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.games = new Array<Game>();
  }

  ngOnInit(): void {
    this.activatedRouteSub = this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit')
      }
    })
  }

  public searchGames(sort: string, searchTerm?:string) {
    this.routeSub = this.httpService
      .getGamesList(sort, searchTerm)
      .subscribe( (gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      })

    // this.httpService.getGames().subscribe(res => console.log(res), error => console.log(error));
  }

  openGameDetails(id: number) {
  this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.activatedRouteSub?.unsubscribe();
  }
}
