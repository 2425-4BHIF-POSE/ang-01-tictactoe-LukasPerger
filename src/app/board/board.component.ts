import {Component, input, InputSignal, output, OutputEmitterRef, Signal, signal, WritableSignal} from '@angular/core';
import {BoardCellComponent, ClickEvent} from './board-cell/board-cell.component';
import {GameStates} from '../app.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    BoardCellComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  protected readonly Array = Array;

  public readonly turn: InputSignal<string> = input.required();
  public readonly onEnd: OutputEmitterRef<EndEvent> = output();
  public readonly onClicked: OutputEmitterRef<null> = output();
  private board: State[][] = [
    [State.Empty, State.Empty, State.Empty],
    [State.Empty, State.Empty, State.Empty],
    [State.Empty, State.Empty, State.Empty]
  ];

  protected handleClick(event: ClickEvent): void{
    const state: State = this.turn() === "X" ? State.X : State.O;
    this.board[event[0]][event[1]] = state;
    this.onClicked.emit(null);

    if(this.won(state, event[0], event[1])){
      if(state == State.X){
        this.onEnd.emit([GameStates.PlayerXWin]);
      }
      else{
        this.onEnd.emit([GameStates.PlayerOWin]);
      }
    }

    if(this.isFull()){
      this.onEnd.emit([GameStates.Draw]);
    }
  }

  private isFull(): boolean {
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[i].length; j++){
        if(this.board[i][j] === State.Empty){
          return false;
        }
      }
    }
    return true;
  }

  private won(checkFor: State, rowIdx: number, colIdx: number): boolean {
    return this.wonRow(checkFor, rowIdx) ||
      this.wonCol(checkFor, colIdx) ||
      this.wonDiag(checkFor);
  }

  private wonCol(checkFor: State, colIdx: number): boolean{
    let count: number = 0;
    for(let i = 0; i < this.board.length; i++){
      if(this.board[i][colIdx] === checkFor){
        count++;
      }
    }
    return count === 3;
  }

  private wonRow(checkFor: State, rowIdx: number): boolean{
    let count: number = 0;
    for(let j = 0; j < this.board[rowIdx].length; j++){
      if(this.board[rowIdx][j] === checkFor){
        count++;
      }
    }
    return count === 3;
  }

  private wonDiag(checkFor: State): boolean{
    let count: number = 0;
    for(let u: number = 0; u < this.board.length; u++){
      if(this.board[u][u] === checkFor){
        count++;

      }
    }

    if(count === 3){
      return true;
    }

    return this.board[2][0] == checkFor &&
      this.board[1][1] == checkFor &&
      this.board[0][2] == checkFor;
  }}

enum State{
  Empty,
  X,
  O
}

export type EndEvent = [number];
