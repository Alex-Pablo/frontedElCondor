import { Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private sTitle: Title) {

  }
  private title = signal('');

  setTitle(update: string) {
    this.title.set(update)
    this.sTitle.setTitle(update)
  }

  getTitle() {
    return this.title
  }
}
