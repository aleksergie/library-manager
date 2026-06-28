import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksList } from './ui/books-list';
import { Toolbar } from './ui/toolbar/toolbar';

@Component({
  imports: [RouterModule, BooksList, Toolbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'library-manager';
}
