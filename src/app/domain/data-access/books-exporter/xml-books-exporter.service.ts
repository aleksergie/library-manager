import { Injectable } from "@angular/core";
import { Book, BooksExporter } from "@domain/models";

@Injectable()
export class XmlBooksExporterService implements BooksExporter {
    private readonly mimeType = 'application/xml';

    public exportBooks(books: ReadonlyArray<Book>): Blob {
        return new Blob([this.serialize(books)], { type: this.mimeType });
    }

    private serialize(books: ReadonlyArray<Book>): string {
        const parts: string[] = [];
        parts.push('<?xml version="1.0" encoding="UTF-8"?>');
        if (books.length === 0) {
            parts.push('<library/>');
            return parts.join('\n');
        }
        parts.push('<library>');
        for (const book of books) {
            parts.push('<book>');
            parts.push(`<title>${this.escapeXml(book.title)}</title>`);
            parts.push(`<author>${this.escapeXml(book.author)}</author>`);
            parts.push(`<pages>${book.pages}</pages>`);
            parts.push('</book>');
        }
        parts.push('</library>');
        return parts.join('\n');
    }

    private escapeXml(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
}

