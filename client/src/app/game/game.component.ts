import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  board: (string | null)[] = Array(9).fill(null);
  currentPlayer: string = 'X'; 


  onCellClick(cellIndex: number): void {
    if (this.board[cellIndex] !== null) {
      return;
    }
    
    this.board[cellIndex] = this.currentPlayer;

    console.log(`Cell clicked: ${cellIndex}, Player: ${this.currentPlayer}`);

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
}