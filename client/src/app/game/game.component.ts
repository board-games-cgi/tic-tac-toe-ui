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
  public roomAccessError: string = '';
  constructor(private socketService: SocketService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {

  };

}
