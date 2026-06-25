import { Component } from '@angular/core';

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
          </label>
        </div>
      </div>
    </header>
  `,
    styleUrls: ['./toolbar.scss']
})
export class Toolbar { }
