import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hubmodal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hubmodal.component.html',
  styleUrl: './hubmodal.component.css'
})
export class HubmodalComponent {
  username: string = '';
  @Output() usernameSet: EventEmitter<string> = new EventEmitter<string>();

  setUsername() {
    if (this.username.trim()) {
      this.usernameSet.emit(this.username.trim()); 
    }
  }
} 