import { Book } from './book';

export interface BooksExporter {
  exportBooks(books: Book[]): Blob;
}
