import {Component, input, Input, InputSignal, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-board-cell',
  standalone: true,
  imports: [],
  templateUrl: './board-cell.component.html',
  styleUrl: './board-cell.component.scss'
})
export class BoardCellComponent {
  @Input()
  public rowIdx: number = 0;
  @Input()
  public colIdx: number = 0;
  public readonly turn: InputSignal<string> = input.required();
  protected readonly content: WritableSignal<string> = signal("");
  public readonly onClicked: OutputEmitterRef<ClickEvent> = output();

  protected handleClick(): void{
    if(this.content() != ""){
      return;
    }

    this.content.set(this.turn());
    this.onClicked.emit([this.rowIdx, this.colIdx])
  }
}

export type ClickEvent = [number, number];
