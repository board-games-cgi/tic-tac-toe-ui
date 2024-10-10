import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { HubmodalComponent } from '../modal/hub-modal/hubmodal/hubmodal.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, HubmodalComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  public clients: string[] = [];
  public showModal: boolean = true; 

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.clients.subscribe((data: string[]) => {
      this.clients = data;
    });
  }

  onUsernameSet(username: string) {
    if (username) {
      this.socketService.setUsername(username);
      this.showModal = false;
    }
  }  
}
