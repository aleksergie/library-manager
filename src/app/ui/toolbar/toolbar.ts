import { Component, inject } from '@angular/core';
import { LibraryControllerService } from '../../domain/data-access/library-controller';
import { BookModal } from '../book-modal/book-modal';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [BookModal],
  template: `
    <header class="toolbar">
      <div class="logo">
        <h1>Library Manager</h1>
      </div>
      
      <div class="actions">
        <input 
          type="search" 
          placeholder="Search by title..." 
          class="search-input"
          (input)="onSearch($event)"
        />

        <button class="btn btn-primary" (click)="formModal.open()">
          <span class="icon">+</span> Add Book
        </button>

        <button class="btn btn-outline" (click)="toggleSort()">
          <span class="icon">↕</span> Sort
        </button>
        
        <div class="divider"></div>

        <div class="file-actions">
          <label class="btn btn-outline">
            <span class="icon">↑</span> Import
              <input type="file" accept=".xml" (change)="onFileSelected($event)" hidden />
          </label>
          <button class="btn btn-outline" (click)="exportLibrary()">
            <span class="icon">↓</span> Export
          </button>
        </div>
      </div>

    <app-book-form #formModal></app-book-form>
    </header>
  `,
  styleUrls: ['./toolbar.scss']
})
export class Toolbar {
  readonly controller = inject(LibraryControllerService);

  protected onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.controller.search(input.value);
  }

  protected async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      await this.controller.importLibrary(input.files[0])
    }
  }

  protected toggleSort(): void {

  }

  protected exportLibrary(): void {

  }
}
