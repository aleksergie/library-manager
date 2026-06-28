import { inject, Injectable } from "@angular/core";
import { BOOKS_EXPORTER, BOOKS_IMPORTER } from "../../tokens";
import { LibraryStore } from "../library-store/library-store.service";
import { Book, BookInput, ImportResult } from "../../models";

@Injectable({ providedIn: 'root' })
export class LibraryControllerService {
    private readonly store = inject(LibraryStore);
    private readonly booksImporter = inject(BOOKS_IMPORTER);
    private readonly booksExporter = inject(BOOKS_EXPORTER);

    readonly filteredBooks = this.store.filteredBooks;
    readonly isSorted = this.store.isSorted;

    public async importLibrary(file: File): Promise<ImportResult> {
        const importResult: ImportResult = await this.booksImporter.importFromFile(file);
        console.log(importResult.books)

        if (importResult.books.length) {
            const books = importResult.books.map((res) => Book.create(res))
            this.store.setBooks(books);
        }

        return importResult;
    }

    public search(query: string): void {
        this.store.setSearchQuery(query);
    }

    public addBook(input: BookInput): void {
        const book = Book.create(input);
        this.store.addBook(book);
    }

    public removeBook(id: string): void {
        this.store.removeBook(id);
    }

    public updateBook(input: BookInput, id: string): void {
        this.store.updateBook(input, id);
    }

    public toggleSorting(): void {
        this.store.toggleSort()
    }

    public exportLibrary(): void {
        const blob = this.booksExporter.exportBooks(this.store.filteredBooks());
        this.triggerDownload(blob, 'library.xml');
    }

    private triggerDownload(blob: Blob, fileName: string): void {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
