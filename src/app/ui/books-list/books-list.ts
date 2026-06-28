import { Component, inject } from '@angular/core';
import { LibraryControllerService } from '@domain/data-access/library-controller';
import { Book } from '@domain/models';
import { BookModal } from '../book-modal/book-modal';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [BookModal],
  template: `<div class="books-container">
      @if (libraryController.filteredBooks().length === 0) {
        <div class="empty-state">
          <div class="empty-icon">📚</div>
          <h2>No books found</h2>
          <p>Try to import from external file, add manually or adjust search query</p>
        </div>
      } @else {
        <div class="books-grid">
          @for (book of libraryController.filteredBooks(); track book.id) {
            <div class="book-card">
              <div class="book-info">
                <h3 class="book-title">{{ book.title }}</h3>
                <p class="book-author">{{ book.author }}</p>
                <div class="book-meta">
                  <span class="badge">{{ book.pages }} pages</span>
                </div>
              </div>
              <div class="book-actions">
                <button class="btn btn-icon" (click)="editBook(book, editModal)" title="Edit">
                  ✎
                </button>
                <button
                  class="btn btn-icon btn-danger"
                  (click)="removeBook(book.id)"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
    <app-book-form #editModal></app-book-form> `,
  styleUrl: './books-list.scss',
})
export class BooksList {
  readonly libraryController: LibraryControllerService = inject(LibraryControllerService);

  protected editBook(book: Book, editModal: BookModal): void {
    editModal.open(book);
  }

  protected removeBook(id: string): void {
    this.libraryController.removeBook(id);
  }
}
