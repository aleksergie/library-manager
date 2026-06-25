import { Component, inject } from "@angular/core";
import { LibraryControllerService } from "../../domain/data-access/library-controller";

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
            </div>
          }
        </div>
    </div>`,
    styleUrl: './books-list.scss'
})
export class BooksList {
    readonly libraryController = inject(LibraryControllerService)
}
