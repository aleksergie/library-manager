export interface BooksImporter {
    importFromFile(file: File): Promise<any>;
}