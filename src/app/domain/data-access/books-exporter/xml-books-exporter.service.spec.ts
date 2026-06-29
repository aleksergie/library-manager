import { TestBed } from '@angular/core/testing';
import { XmlBooksExporterService } from './index';
import { Book } from '@domain/models';

describe('XmlBooksExporterService', () => {
    let service: XmlBooksExporterService;
const readBlobAsText = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(blob);
    });
  };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [XmlBooksExporterService],
        });
        service = TestBed.inject(XmlBooksExporterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    describe('exportBooks', () => {
    it('should correctly serialize books to XML and return a Blob', async () => {
      const books: Book[] = [
        { id: 'randomId', title: 'The Shining', author: 'Stephen King', pages: 647 }
      ];
      const blob = service.exportBooks(books);
        const text = await readBlobAsText(blob);
        
      expect(blob.type).toBe('application/xml');
      expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(text).toContain('<library>');
      expect(text).toContain('<book>');
      expect(text).toContain('<title>The Shining</title>');
      expect(text).toContain('<author>Stephen King</author>');
      expect(text).toContain('<pages>647</pages>');
    });

    it('should escape special characters in XML', async () => {
      const books: Book[] = [
        { id: '1', title: 'A & B < C > D " E \' F', author: 'Me', pages: 10 }
      ];
      const blob = service.exportBooks(books);
      const text = await readBlobAsText(blob);
      expect(text).toContain('<title>A &amp; B &lt; C &gt; D &quot; E &apos; F</title>');
    });

    it('should handle an empty array correctly', async () => {
      const blob = service.exportBooks([]);
      const text = await readBlobAsText(blob);
      expect(text).toContain('<library/>');
    });
  });
})