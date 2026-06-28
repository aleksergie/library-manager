import { Component, computed, ElementRef, inject, Signal, signal, viewChild } from '@angular/core';
import { LibraryControllerService } from '@domain/data-access/library-controller';
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

        <button class="btn btn-outline" (click)="toggleSort()" [disabled]="isEmpty()" [class.active]="isSorted()">
          <span class="icon">↕</span> Sort
        </button>
        
        <div class="divider"></div>

        <div class="file-actions">
           <button class="btn btn-primary" (click)="formModal.open()">
          <span class="icon">+</span> Add Book
        </button>

          <label class="btn btn-outline">
            <span class="icon">↑</span> Import
              <input type="file" accept=".xml" (change)="onFileSelected($event)" hidden />
          </label>
          <button class="btn btn-outline" [disabled]="isEmpty()" (click)="exportLibrary()">
            <span class="icon">↓</span> Export
          </button>
        </div>
      </div>
      <div #importPopover popover="manual" class="popover">
        <span class="popover-content">{{ popoverMessage() }}</span>
      </div>

    </header>
    <app-book-form #formModal></app-book-form>
  `,
  styleUrls: ['./toolbar.scss']
})
export class Toolbar {
  private readonly popoverElement: Signal<ElementRef<HTMLDivElement>> = viewChild.required('importPopover');
  private controller = inject(LibraryControllerService);

  readonly isSorted = this.controller.isSorted
  readonly isEmpty = computed(() => !this.controller.filteredBooks().length)
  readonly popoverMessage = signal<string>('');
  private popoverTimeout: ReturnType<typeof setTimeout> | null = null;

  protected onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.controller.search(input.value);
  }

  protected async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files || !input.files.length) {
      return;
    }

    try {
      const importResult = await this.controller.importLibrary(input.files[0]);
      if (!importResult.books.length) {
        throw new Error('Invalid file')
      }
    } catch (err) {
      this.showPopover('Invalid file. Please try to import non-empty one.')
    } finally {
      this.resetInputValue(input);
    }
  }

  protected toggleSort(): void {
    this.controller.toggleSorting()
  }

  protected exportLibrary(): void {
    this.controller.exportLibrary()
  }

  private showPopover(message: string): void {
    this.popoverMessage.set(message);
    const popover = this.popoverElement().nativeElement;

    popover.showPopover();

    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout)
    };

    this.popoverTimeout = setTimeout(() => {
      popover.hidePopover();
    }, 4000);
  }

  private resetInputValue(input: HTMLInputElement): void {
    input.value = '';
  }
}
