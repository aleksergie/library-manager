import { Injectable, computed, inject, signal } from '@angular/core';
import { Book } from '@domain/models';
import { FilterService, SortService } from '@domain/utils';

@Injectable({ providedIn: 'root' })
export class LibraryStore {
  private readonly _books = signal<Book[]>([]);
  private readonly _searchQuery = signal<string>('');
  private readonly _filterService = inject(FilterService);
  private readonly _sortService = inject(SortService);
  private readonly _isSorted = signal<boolean>(false);

  readonly isSorted = this._isSorted.asReadonly();

  readonly filteredBooks = computed(() => {
    let books = this._books();
    const query = this._searchQuery();

    if (query) {
      books = this._filterService.filterBooksByTitle(books, query);
    }

    if (this.isSorted()) {
      books = this._sortService.sortBooks(books);
    }

    return books;
  });

  public setBooks(books: Book[]): void {
    this._books.set(books);
  }

  public setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  public addBook(book: Book): void {
    this._books.update((books) => [...books, book]);
  }

  public updateBook(updatedBook: Book): void {
    this._books.update((books) =>
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
    );
  }

  public removeBook(id: string): void {
    this._books.update((books) => books.filter((book) => book.id !== id));
  }

  public toggleSort(): void {
    this._isSorted.update((isSorted) => !isSorted);
  }
}
