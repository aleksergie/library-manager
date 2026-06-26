import { Injectable, computed, inject, signal } from '@angular/core';
import { Book } from '../../models';
import { FilterService } from '../../utils';

@Injectable({ providedIn: 'root' })
export class LibraryStore {
    private readonly books = signal<Book[]>([]);
    private readonly searchQuery = signal<string>('');
    private readonly filterService = inject(FilterService);

    readonly filteredBooks = computed(() => {
        let books = this.books();
        const query = this.searchQuery();

        if (query) {
            books = this.filterService.filterBooksByTitle(books, query);
        }

        return books;
    });

    public setBooks(books: Book[]): void {
        this.books.set(books);
    }

    public setSearchQuery(query: string): void {
        this.searchQuery.set(query);
    }

    public addBook(book: Book): void {
        this.books.update(books => [...books, book]);
    }

    public updateBook(updatedBook: Book): void {
        this.books.update(books => books.map(book => book.id === updatedBook.id ? updatedBook : book));
    }
}
