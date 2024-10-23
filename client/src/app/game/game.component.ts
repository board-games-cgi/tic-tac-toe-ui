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
  public roomAccessError: string = '';
  constructor(private socketService: SocketService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId') || '';
      this.socketService.emit('joinRoom', this.roomId);
    });
  }
}