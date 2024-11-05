import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoardCellComponent} from './board/board-cell/board-cell.component';
import {BoardComponent, EndEvent} from './board/board.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardCellComponent, BoardComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TicTacToe';
  protected readonly gameState: WritableSignal<GameStates> = signal(GameStates.PlayerXTurn);
  protected readonly turn: Signal<string> = computed(() => {
    let a = this.gameState(); //doesn't want to change? or the children don't get it
    return this.getString()
  });

  protected repeat(): void{
    window.location.reload(); //fast solution
  }

  protected getString(): string{
    return this.gameState() === GameStates.PlayerOTurn ||
    this.gameState() === GameStates.PlayerOWin ? "O" : "X";
  }

  protected handleTurnChange(): void {
    this.gameState.set(this.gameState() === GameStates.PlayerXWin ? GameStates.PlayerOTurn : GameStates.PlayerXTurn)
  }

  protected handleEnd(event: EndEvent): void{
    const endState: GameStates = event[0];
    this.gameState.set(endState);
  }

  protected readonly GameStates = GameStates;
}

export enum GameStates{
  PlayerXTurn,
  PlayerOTurn,
  PlayerXWin = 5,
  PlayerOWin,
  Draw
}
