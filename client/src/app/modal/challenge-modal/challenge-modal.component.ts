import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-challenge-modal',
  standalone: true,
  imports: [],
  templateUrl: './challenge-modal.component.html',
  styleUrl: './challenge-modal.component.css'
})
export class ChallengeModalComponent {
  @Input() challenger: string = ''; 
  @Output() acceptChallenge: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: SocketService) { }

  onAcceptChallenge(){
    let roomId = Math.floor(Math.random() * 50)
    this.service.challengeAccpeted(roomId);
  }
}
