import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title$ = new BehaviorSubject<string>('');

  constructor() {}

  setCurrentTitle(title) {
    this.title$.next(title);
  }

  getCurrentTitle(): Observable<string> {
    return this.title$.asObservable();
  }
}
