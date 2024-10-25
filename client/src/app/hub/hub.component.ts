import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { HubmodalComponent } from '../modal/hubmodal/hubmodal.component';
import { ChallengeModalComponent } from '../modal/challenge-modal/challenge-modal.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, HubmodalComponent, ChallengeModalComponent, FormsModule],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  public clients: {username: string, socketId: string}[] = [];
  public clientColors: { [key: string]: string } = {};
  public currentUser: string = 'Player';
  public showModal: boolean = true;
  public showChallengeModal: boolean = false;
  public challenger: string = ''; 
  roomId: string = '';

  @ViewChild('svg') svg!: ElementRef

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.clients.subscribe((data: {username: string, socketId: string}[]) => {
      this.clients = data.filter(client => client.username !== this.currentUser); 
    });

    this.socketService.listenForChallenge().subscribe((challenger: string) => {
      console.log('Received challenge from:', challenger);
      this.challenger = challenger;
      this.showChallengeModal = true;
    });
  
    this.socketService.onColorChange().subscribe(({ username, color }) => {
      this.clientColors[username] = color; 
      if (username === this.currentUser) {
        this.svg.nativeElement.style.backgroundColor = color;
      }
    });

    this.socketService.redirect().subscribe(url => {});

    this.socketService.on('roomAccessDenied').subscribe((message: string) => {
      alert(message);
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

  onUserChangeColor(colorId: number) {
    let color = '';
    switch (colorId) {
      case 1: color = "purple"; break;
      case 2: color = "red"; break;
      case 3: color = "blue"; break;
      case 4: color = "green"; break;
      case 5: color = "black"; break;
      case 6: color = "yellow"; break;
    }
  
    this.svg.nativeElement.style.backgroundColor = color;
    this.socketService.setColor(this.currentUser, color);
  };

  //test
  joinRoom() {
      this.socketService.emit('joinRoom', this.roomId);
  }
}