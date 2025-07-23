import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-check',
  templateUrl: './input-check.component.html',
  styleUrls: ['./input-check.component.css']
})
export class InputCheckComponent  {

  @Input() label: string = '';  // Ej: "Presente", "Pasado", "Participio"
  @Input() placeholder: string = '';
  @Output() userInput = new EventEmitter<string>();

  value: string = '';

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.userInput.emit(this.value.trim());
  }

}
