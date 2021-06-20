import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../Models/Interfaces/interfaces";

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {

  // @ts-ignore
  @Input() game: Game;
  constructor() { }

  ngOnInit(): void {
  }

}
