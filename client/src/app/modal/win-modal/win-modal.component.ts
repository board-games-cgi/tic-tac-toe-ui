import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-win-modal',
  standalone: true,
  imports: [],
  templateUrl: './win-modal.component.html',
  styleUrl: './win-modal.component.css'
})
export class WinModalComponent {
  roomId: string = '';

  constructor(private socketService: SocketService, private route: ActivatedRoute, private activeModal: NgbActiveModal) { }

  closeGame() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId') || '';
      this.socketService.closeGame(this.roomId)
    })
    this.activeModal.close()
  }
}
