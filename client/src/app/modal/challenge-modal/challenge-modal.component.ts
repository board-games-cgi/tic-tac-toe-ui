import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  onAcceptChallenge(){
    this.acceptChallenge.emit();
  }
}
