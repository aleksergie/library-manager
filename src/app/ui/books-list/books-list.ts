import { Component } from "@angular/core";

@Component({
    selector: 'app-books-list',
    standalone: true,
    imports: [],
    template: `<div class="books-container">
        <div class="books-grid">
            <div class="book-card">
                <div class="book-info">
                    <h3 class="book-title">Title</h3>
                    <p class="book-author">Author</p>
                    <div class="book-meta">
                        <span class="badge">123</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    styleUrl: './books-list.scss'
})
export class BooksList { }