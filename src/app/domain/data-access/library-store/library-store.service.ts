import { Injectable, computed, signal } from '@angular/core';
import { Book } from '../../models';


@Injectable({ providedIn: 'root' })
export class LibraryStore {
    private readonly books = signal<Book[]>([]);

    readonly filteredBooks = computed(() => {
        let result = this.books();
        return result;
    });

    setBooks(books: Book[]): void {
        this.books.set(books);
    }
}
