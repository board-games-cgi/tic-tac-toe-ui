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
  public currentUser: string = 'Player';
  public showModal: boolean = true;
  selectedClass: string = 'black-fill';

  @ViewChild('svg') svg!: ElementRef

  constructor(private socketService: SocketService) { }

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

  onUserChangeColor(colorId: number) {
    switch (colorId) {
      case 1:
        this.svg.nativeElement.style.backgroundColor = "purple"
        break
      case 2:
        this.svg.nativeElement.style.backgroundColor = "red"
        break
      case 3:
        this.svg.nativeElement.style.backgroundColor = "blue"
        break
      case 4:
        this.svg.nativeElement.style.backgroundColor = "green"
        break
      case 5:
        this.svg.nativeElement.style.backgroundColor = "black"
        break
      case 6:
        this.svg.nativeElement.style.backgroundColor = "yellow"
        break
    }
  };

}
