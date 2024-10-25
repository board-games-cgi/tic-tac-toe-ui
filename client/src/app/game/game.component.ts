import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css' ]
})
export class GameComponent implements OnInit {
  roomId: string = '';
  board: (string | null)[] = Array(9).fill(null);
  currentPlayer: string = 'X'; 
  public roomAccessError: string = '';
  public playerSymbol: string = ''; 

  constructor(private socketService: SocketService, private route: ActivatedRoute) { }

  onCellClick(cellIndex: number): void {
    if (this.board[cellIndex] !== null || this.currentPlayer !== this.playerSymbol) return;

    this.socketService.makeMove(this.roomId, cellIndex, this.playerSymbol);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId') || '';
      this.socketService.emit('joinRoom', this.roomId);

      this.playerSymbol = Math.random() < 0.5 ? 'X' : 'O'; 
    });

    this.socketService.listenForBoardUpdates().subscribe((data) => {
      this.board = data.board;
      this.currentPlayer = data.nextPlayer; 
    });
  }
}
