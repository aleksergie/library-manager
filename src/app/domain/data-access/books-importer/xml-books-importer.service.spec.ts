import { TestBed } from '@angular/core/testing';
import { XmlBooksImporterService } from './index';

describe('XmlBooksImporterService', () => {
  let service: XmlBooksImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XmlBooksImporterService],
    });
    service = TestBed.inject(XmlBooksImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('importFromFile', () => {
    it('should parse valid XML file and return BookInputs', async () => {
      const xmlContent = `
        <library>
          <book>
            <title>The Shining</title>
            <author>Stephen King</author>
            <pages>647</pages>
          </book>
        </library>
      `;
      const file = new File([xmlContent], 'books.xml', { type: 'application/xml' });
      const result = await service.importFromFile(file);

      expect(result.books.length).toBe(1);
      expect(result.books[0].title).toBe('The Shining');
      expect(result.books[0].author).toBe('Stephen King');
      expect(result.books[0].pages).toBe(647);
    });

    it('should return empty array if no books present', async () => {
      const xmlContent = '<library/>';
      const file = new File([xmlContent], 'books.xml', { type: 'application/xml' });
      const result = await service.importFromFile(file);
      expect(result.books.length).toBe(0);
    });
  });
});
