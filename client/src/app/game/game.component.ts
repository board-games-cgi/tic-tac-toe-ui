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

  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
    
  onCellClick(cellIndex: number): void {
    if (this.board[cellIndex] !== null) {
      return;
    }
    
    this.board[cellIndex] = this.currentPlayer;

    console.log(`Cell clicked: ${cellIndex}, Player: ${this.currentPlayer}`);

    if (this.checkForWin()) {
      console.log(`The player ${this.currentPlayer} won the game!`);
      this.resetGame()
      return;
    } 

    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  };

  checkForWin(): boolean {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      } 
    }
    return false;
  }

  resetGame(){
  this.board = Array(9).fill(null);
  this.currentPlayer = 'X'; 
  }
}