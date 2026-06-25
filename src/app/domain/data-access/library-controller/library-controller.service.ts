import { inject, Injectable } from "@angular/core";
import { BOOKS_IMPORTER } from "../../tokens";

@Injectable({ providedIn: 'root' })
export class LibraryControllerService {
    private readonly booksImporter = inject(BOOKS_IMPORTER);

    async importLibrary(file: File): Promise<any> {
        const result = await this.booksImporter.importFromFile(file);
        console.log(result)
    }
}