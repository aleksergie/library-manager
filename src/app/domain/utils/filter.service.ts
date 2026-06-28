import { Injectable } from '@angular/core';
import { Book } from '../models';

@Injectable({ providedIn: 'root' })
export class FilterService {
  public filterBooksByTitle(books: ReadonlyArray<Book>, query: string): Book[] {
    const trimmed = query.trim();
    if (!trimmed) {
      return [...books];
    }
    return books.filter((book) => this.matchesTitleQuery(book, trimmed));
  }

  private matchesTitleQuery(book: Book, rawQuery: string): boolean {
    const query = rawQuery.trim();
    if (!query) {
      return true;
    }
    return book.title.toLowerCase().includes(query.toLowerCase());
  }
}
