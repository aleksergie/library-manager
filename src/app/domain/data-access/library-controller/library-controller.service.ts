import { inject, Injectable } from "@angular/core";
import { BOOKS_EXPORTER, BOOKS_IMPORTER } from "../../tokens";
import { LibraryStore } from "../library-store/library-store.service";
import { Book } from "../../models";

@Injectable({ providedIn: 'root' })
export class LibraryControllerService {
    private readonly store = inject(LibraryStore);
    private readonly booksImporter = inject(BOOKS_IMPORTER);
    private readonly booksExporter = inject(BOOKS_EXPORTER);

    readonly filteredBooks = this.store.filteredBooks;
    readonly isSorted = this.store.isSorted;

    async importLibrary(file: File): Promise<any> {
        const result = await this.booksImporter.importFromFile(file);
        console.log(result)

        const validBooks: Book[] = [];
        for (const b of result) {
            validBooks.push({
                id: crypto.randomUUID(),
                title: b.title,
                author: b.author,
                pages: b.pages
            });
        }
        this.store.setBooks(validBooks);
    }

    search(query: string): void {
        this.store.setSearchQuery(query);
    }

    addBook(input: any): void {
        const book: Book = {
            id: crypto.randomUUID(),
            title: input.title.trim(),
            author: input.author.trim(),
            pages: input.pages
        };
        this.store.addBook(book);
    }

    public removeBook(id: string): void {
        this.store.removeBook(id);
    }

    public updateBook(input: Book): void {
        this.store.updateBook(input);
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
