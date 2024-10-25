import { Component, EventEmitter, Input, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  @Input() searchMessage: string = '';
  @Output() searchChange = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(1500)).subscribe((value) => {
      this.searchChange.emit(value);
    });
  }

  onSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }
}
