import { inject, Injectable } from "@angular/core";
import { BOOKS_IMPORTER } from "../../tokens";
import { LibraryStore } from "../library-store/library-store.service";
import { Book } from "../../models";

@Injectable({ providedIn: 'root' })
export class LibraryControllerService {
    private readonly store = inject(LibraryStore);
    private readonly booksImporter = inject(BOOKS_IMPORTER);

    readonly filteredBooks = this.store.filteredBooks;

    async importLibrary(file: File): Promise<any> {
        const result = await this.booksImporter.importFromFile(file);
        console.log(result)

        const validBooks: Book[] = [];
        for (const b of result) {
            validBooks.push({
                id: crypto.randomUUID(),
                title: b.title.trim(),
                author: b.author.trim(),
                pages: b.pages as number
            });
        }
        this.store.setBooks(validBooks);
    }
}
