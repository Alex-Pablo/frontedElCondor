import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input-text-area',
  standalone: true,
  imports: [],
  template: `
      <div class="w-full ">
        <label for="message" class="block">{{label()}}</label>
        <textarea id=" message" rows="4"
          class="block p-2.5 w-full text-sm  rounded-lg border border-gray-300 focus:outline-none focus:border-teal-800"
          [placeholder]="placeholder()"></textarea>
      </div>
  `,
  styles: ``
})

export class InputTextAreaComponent {
  label = input.required<string>();
  placeholder = input<string>();
}
