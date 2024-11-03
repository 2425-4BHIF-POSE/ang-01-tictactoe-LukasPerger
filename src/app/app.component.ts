import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoardCellComponent} from './board/board-cell/board-cell.component';
import {BoardComponent} from './board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardCellComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TicTacToe';
}
