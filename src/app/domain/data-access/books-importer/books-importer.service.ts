import { Injectable } from "@angular/core";
import { BooksImporter } from "../../models";

@Injectable()
export class BooksImporterService implements BooksImporter {
    async importFromFile(file: File): Promise<any> {
        const text = await this.readFileAsText(file);
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'application/xml');
        const bookNodes = Array.from(doc.getElementsByTagName('book'));
        console.log(bookNodes)
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