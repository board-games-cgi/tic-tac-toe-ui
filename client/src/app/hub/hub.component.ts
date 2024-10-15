import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  public clientColors: { [key: string]: string } = {};
  public currentUser: string = 'Player';
  public showModal: boolean = true;
  selectedClass: string = 'black-fill';

  @ViewChild('svg') svg!: ElementRef

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.clients.subscribe((data: string[]) => {
      this.clients = data.filter(client => client !== this.currentUser);
    });
  
    this.socketService.onColorChange().subscribe(({ username, color }) => {
      this.clientColors[username] = color; 
      if (username === this.currentUser) {
        this.svg.nativeElement.style.backgroundColor = color;
      }
    });
  }

  onUsernameSet(username: string) {
    if (username) {
      this.currentUser = username;
      this.socketService.setUsername(username);
      this.showModal = false;
    }
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
  }
};

