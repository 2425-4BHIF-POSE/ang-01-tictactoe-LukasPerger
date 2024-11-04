import {Component, signal, WritableSignal} from '@angular/core';
import {CellState} from '../../../model';

@Component({
  selector: 'app-board-cell',
  standalone: true,
  imports: [],
  templateUrl: './board-cell.component.html',
  styleUrl: './board-cell.component.scss'
})
export class BoardCellComponent {
  protected readonly EMPTY_CHAR: String = "";
  protected readonly RED_CHAR: String = "x";
  protected readonly BLUE_CHAR: String = "o";
  protected readonly CellState = CellState;

  public readonly state: WritableSignal<CellState> = signal(CellState.Empty);
}
