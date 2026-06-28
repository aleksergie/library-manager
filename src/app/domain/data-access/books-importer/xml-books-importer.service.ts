import { Injectable } from "@angular/core";
import { BooksImporter, ImportResult, BookInput } from "@domain/models";

@Injectable()
export class XmlBooksImporterService implements BooksImporter {
    public async importFromFile(file: File): Promise<ImportResult> {
        const text = await this.readFileAsText(file);
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'application/xml');
        const bookNodes = Array.from(doc.getElementsByTagName('book'));
        console.log(bookNodes)

        const books: BookInput[] = [];
        for (let i = 0; i < bookNodes.length; i++) {
            const node = bookNodes[i];
            const titleNode = node.getElementsByTagName('title')[0];
            const authorNode = node.getElementsByTagName('author')[0];
            const pagesNode = node.getElementsByTagName('pages')[0];

            const title = titleNode?.textContent || '';
            const author = authorNode?.textContent || '';
            const pagesStr = pagesNode?.textContent || '';
            const pages = pagesStr ? Number(pagesStr) : 0;

            const bookInput = { title, author, pages: Number.isNaN(pages) ? 0 : pages };
            books.push(bookInput as BookInput)

        }
        console.log(books)
        return { books };

    }

    private readFileAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            if (file.text) {
                file.text().then(resolve).catch(reject);
            } else {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.onerror = (e) => reject(e);
                reader.readAsText(file);
            }
        });
    }
}