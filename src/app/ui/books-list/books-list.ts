import { Component, inject } from "@angular/core";
import { LibraryControllerService } from "../../domain/data-access/library-controller";
import { Book } from "../../domain/models";

@Component({
    selector: 'app-books-list',
    standalone: true,
    imports: [],
    template: `<div class="books-container">
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
                <button class="btn btn-icon" (click)="editBook(book)" title="Edit">✎</button>
                <button class="btn btn-icon btn-danger" (click)="removeBook(book.id)" title="Remove">✕</button>
              </div>
            </div>
          }
        </div>
    </div>`,
    styleUrl: './books-list.scss'
})
export class BooksList {
    readonly libraryController = inject(LibraryControllerService)

    protected editBook(book: Book): void {
    }

    protected removeBook(id: string): void {
    }
}
