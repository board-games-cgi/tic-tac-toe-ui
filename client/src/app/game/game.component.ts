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
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  roomId: string = '';
  board: (string | null)[] = Array(9).fill(null);
  currentPlayer: string = 'X'; 
  public roomAccessError: string = '';
  constructor(private socketService: SocketService, private route: ActivatedRoute) { }

  onCellClick(cellIndex: number): void {
    if (this.board[cellIndex] !== null) return;
  
    this.socketService.makeMove(this.roomId, cellIndex, this.currentPlayer);
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId') || '';
      this.socketService.emit('joinRoom', this.roomId);
    });
  
    this.socketService.listenForBoardUpdates().subscribe((data) => {
      this.board = data.board;
      this.currentPlayer = data.nextPlayer;
    });
  }

}