import { Component } from '@angular/core';
import {BoardCellComponent} from './board-cell/board-cell.component';

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


}
