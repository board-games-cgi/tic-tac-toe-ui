import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  roomId: string = '';
  public roomAccessError: string = '';
  board: (string | null)[] = Array(9).fill(null);
  currentPlayer: string = 'X'; 
  isWin: boolean = false;
  isDraw: boolean = false;
  isGameOver: boolean = false;
  constructor(private socketService: SocketService, private route: ActivatedRoute) { }

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
    if (this.board[cellIndex] !== null || this.isGameOver) {
      return;
    }
    
    this.board[cellIndex] = this.currentPlayer;

    console.log(`Cell clicked: ${cellIndex}, Player: ${this.currentPlayer}`);

    if (this.checkForWin()) {
      this.isWin = true;
      this.isGameOver = true;
      return;
    }

    if (this.isBoardFull()) {
      this.isDraw = true;
      this.isGameOver = true;
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

  isBoardFull(): boolean {
    return this.board.every(cell => cell !== null);
  }

  resetGame(){
  this.board = Array(9).fill(null);
  this.currentPlayer = 'X';
  this.isWin = false;
  this.isDraw = false;
  this.isGameOver = false;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId') || '';
      this.socketService.emit('joinRoom', this.roomId);
    });
  }
}