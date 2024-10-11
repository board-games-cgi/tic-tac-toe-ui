import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { HubmodalComponent } from '../modal/hubmodal/hubmodal.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, HubmodalComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  public clients: string[] = [];
  public currentUser: string = 'Player';
  public showModal: boolean = true; 

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.clients.subscribe((data: string[]) => {
      this.clients = data.filter(client => client !== this.currentUser);
    });
  }

  onUsernameSet(username: string) {
    if (username) {
      this.currentUser = username;
      this.socketService.setUsername(username);
      this.showModal = false;
    }
  }  
}
