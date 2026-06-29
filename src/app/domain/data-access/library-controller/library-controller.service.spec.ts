import { TestBed } from '@angular/core/testing';
import { LibraryControllerService } from './library-controller.service';
import { LibraryStore } from '../library-store';
import { BOOKS_IMPORTER, BOOKS_EXPORTER } from '@domain/tokens';
import { signal } from '@angular/core';

describe('LibraryControllerService', () => {
  let service: LibraryControllerService;
  let mockStore: any;
  let mockImporter: any;
  let mockExporter: any;

  beforeEach(() => {
    mockStore = {
      filteredBooks: signal([]),
      isSorted: signal(false),
      setBooks: jest.fn(),
      setSearchQuery: jest.fn(),
      addBook: jest.fn(),
      removeBook: jest.fn(),
      updateBook: jest.fn(),
      toggleSort: jest.fn(),
    };
    mockImporter = { importFromFile: jest.fn() };
    mockExporter = { exportBooks: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        LibraryControllerService,
        { provide: LibraryStore, useValue: mockStore },
        { provide: BOOKS_IMPORTER, useValue: mockImporter },
        { provide: BOOKS_EXPORTER, useValue: mockExporter },
      ],
    });
    service = TestBed.inject(LibraryControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('importLibrary', () => {
    it('should import books and set them in store', async () => {
      const mockFile = new File([''], 'test.xml');
      const importResult = { books: [{ title: 'B1', author: 'A1', pages: 100 }] };
      mockImporter.importFromFile.mockResolvedValue(importResult);

      const result = await service.importLibrary(mockFile);
      expect(result).toEqual(importResult);
      expect(mockStore.setBooks).toHaveBeenCalled();
      const calledWith = mockStore.setBooks.mock.calls[0][0];
      expect(calledWith[0].title).toBe('B1');
      expect(calledWith[0].id).toBeDefined();
    });

    it('should not set books if import result is empty', async () => {
      const mockFile = new File([''], 'test.xml');
      mockImporter.importFromFile.mockResolvedValue({ books: [] });

      await service.importLibrary(mockFile);
      expect(mockStore.setBooks).not.toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should call store setSearchQuery', () => {
      service.search('query');
      expect(mockStore.setSearchQuery).toHaveBeenCalledWith('query');
    });
  });

  describe('addBook', () => {
    it('should call store addBook with created Book', () => {
      service.addBook({ title: 'T', author: 'A', pages: 10 });
      expect(mockStore.addBook).toHaveBeenCalled();
      const calledWith = mockStore.addBook.mock.calls[0][0];
      expect(calledWith.title).toBe('T');
    });
  });

  describe('removeBook', () => {
    it('should call store removeBook', () => {
      service.removeBook('1');
      expect(mockStore.removeBook).toHaveBeenCalledWith('1');
    });
  });

  describe('updateBook', () => {
    it('should call store updateBook', () => {
      service.updateBook({ title: 'T', author: 'A', pages: 10 }, '1');
      expect(mockStore.updateBook).toHaveBeenCalled();
      const calledWithBook = mockStore.updateBook.mock.calls[0][0];
      expect(calledWithBook.title).toBe('T');
      expect(mockStore.updateBook.mock.calls[0][1]).toBe('1');
    });
  });

  describe('toggleSorting', () => {
    it('should call store toggleSort', () => {
      service.toggleSorting();
      expect(mockStore.toggleSort).toHaveBeenCalled();
    });
  });

  describe('exportLibrary', () => {
    it('should export filtered books and trigger download', () => {
      global.URL.createObjectURL = jest.fn().mockReturnValue('blob:url');
      global.URL.revokeObjectURL = jest.fn();

      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
      } as unknown as HTMLAnchorElement;

      jest.spyOn(document, 'createElement').mockReturnValue(mockLink);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink);

      const mockBooks = [{ id: '1', title: 'T', author: 'A', pages: 10 }];
      mockStore.filteredBooks = signal(mockBooks);
      const mockBlob = new Blob();
      mockExporter.exportBooks.mockReturnValue(mockBlob);

      service.exportLibrary();

      expect(mockExporter.exportBooks).toHaveBeenCalledWith(mockBooks);
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(mockLink.href).toBe('blob:url');
      expect(mockLink.download).toBe('library.xml');
      expect(mockLink.click).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:url');
    });
  });
});
