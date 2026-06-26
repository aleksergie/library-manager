import { CommonModule } from "@angular/common";
import { Component, ElementRef, inject, signal, ViewChild } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Book } from "../../domain/models";
import { LibraryControllerService } from "../../domain/data-access/library-controller";

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `<dialog #dialog class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ isEditing() ? 'Edit Book' : 'Add Book' }}</h2>
          <button class="btn-close" (click)="close()">✕</button>
        </div>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" formControlName="title" placeholder="e.g. The Shining" />
            @if (form.get('title')?.touched && form.get('title')?.invalid) {
              <div class="error">
                Title is required (max 500 chars).
              </div>
            }
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input id="author" type="text" formControlName="author" placeholder="e.g. Stephen King" />
            @if (form.get('author')?.touched && form.get('author')?.invalid) {
              <div class="error">
                Author is required (max 200 chars).
              </div>
            }
          </div>

          <div class="form-group">
            <label for="pages">Pages</label>
            <input id="pages" type="number" formControlName="pages" placeholder="e.g. 447" />
            @if (form.get('pages')?.touched && form.get('pages')?.invalid) {
              <div class="error">
                Pages must be between 1 and 100,000.
              </div>
            }
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-outline" (click)="close()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Save</button>
          </div>
        </form>
      </div>
    </dialog>`,
  styleUrl: './book-modal.scss'
})
export class BookModal {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  private readonly controller = inject(LibraryControllerService);
  private readonly fb = inject(FormBuilder);

  readonly isEditing = signal(false);
  readonly editingId = signal<string | null>(null);

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(500)]],
    author: ['', [Validators.required, Validators.maxLength(200)]],
    pages: [0, [Validators.required, Validators.min(1), Validators.max(10000)]]
  });

  public open(book?: Book) {
    if (book) {
      this.editingId.set(book.id);
      this.isEditing.set(true)
      this.form.patchValue({
        title: book.title,
        author: book.author,
        pages: book.pages
      });
    } else {
      this.isEditing.set(false);
      this.editingId.set(null);
      this.form.reset();
    }

    this.dialog.nativeElement.showModal();
  }

  public close() {
    this.dialog.nativeElement.close();
  }

  public onSubmit() {
    const modalData: Book = {
      id: this.editingId() as string,
      title: this.form.value.title || '',
      author: this.form.value.author || '',
      pages: this.form.value.pages as number
    };

    if (this.isEditing() && this.editingId()) {
      this.controller.updateBook(modalData);
    } else {
      this.controller.addBook(modalData);
    }

    this.close();
  }
}