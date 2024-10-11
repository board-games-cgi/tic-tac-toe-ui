import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { HubmodalComponent } from '../modal/hub-modal/hubmodal/hubmodal.component';
import { ChallengeModalComponent } from '../modal/challenge-modal/challenge-modal.component';


@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, HubmodalComponent, ChallengeModalComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  public clients: {username: string, socketId: string}[] = [];
  public currentUser: string = 'Player';
  public showModal: boolean = true;
  public showChallengeModal: boolean = false;
  public challenger: string = ''; 

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.clients.subscribe((data: {username: string, socketId: string}[]) => {
      this.clients = data.filter(client => client.username !== this.currentUser); 
    });

    this.socketService.listenForChallenge().subscribe((challenger: string) => {
      console.log('Received challenge from:', challenger);
      this.challenger = challenger;
      this.showChallengeModal = true;
    });
  }

  onUsernameSet(username: string) {
    if (username) {
      this.currentUser = username;
      this.socketService.setUsername(username);
      this.showModal = false;
    }
  }  

  challengePlayer(challengedSocketId: string){
    this.socketService.challengePlayer(challengedSocketId)
    
  }

  onChallengeAccepted() {
    console.log(`${this.currentUser} accepted challenge from ${this.challenger}`);
    this.showChallengeModal = false;
  }
}
