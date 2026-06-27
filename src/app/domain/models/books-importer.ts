import { ImportResult } from "./book";

export interface BooksImporter {
    importFromFile(file: File): Promise<ImportResult>;
}