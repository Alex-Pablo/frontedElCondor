import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './input-field.component.html',
  styles: ``
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  // @Input() control!: FormControl;
}
