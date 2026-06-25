import { Component, inject } from '@angular/core';
import { LibraryControllerService } from '../../domain/data-access/library-controller';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  template: `
    <header class="toolbar">
      <div class="logo">
        <h1>Library</h1>
      </div>
      
      <div class="actions">
        <input 
          type="search" 
          placeholder="Search by title..." 
          class="search-input"
        />
        
        <div class="divider"></div>

        <div class="file-actions">
          <label class="btn btn-outline">
            <span class="icon">↑</span> Import
              <input type="file" accept=".xml" (change)="onFileSelected($event)" hidden />
          </label>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./toolbar.scss']
})
export class Toolbar {
  readonly controller = inject(LibraryControllerService);

  protected async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      await this.controller.importLibrary(input.files[0])
    }

  }
}
