import { TestBed } from '@angular/core/testing';
import { LibraryStore } from './library-store.service';
import { FilterService, SortService } from '@domain/utils';
import { Book } from '@domain/models';

describe('LibraryStore', () => {
  let service: LibraryStore;
  let mockFilterService: Partial<FilterService>;
  let mockSortService: Partial<SortService>;

  const book1: Book = { id: '1', title: 'Book 1', author: 'Author 1', pages: 100 };
  const book2: Book = { id: '2', title: 'Book 2', author: 'Author 2', pages: 200 };

  beforeEach(() => {
    mockFilterService = {
      filterBooksByTitle: jest.fn().mockImplementation((books, query) => books),
    };
    mockSortService = { sortBooks: jest.fn().mockImplementation((books) => [...books].reverse()) };

    TestBed.configureTestingModule({
      providers: [
        LibraryStore,
        { provide: FilterService, useValue: mockFilterService },
        { provide: SortService, useValue: mockSortService },
      ],
    });
    service = TestBed.inject(LibraryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setBooks', () => {
    it('should set books and update filteredBooks', () => {
      service.setBooks([book1]);
      expect(service.filteredBooks()).toEqual([book1]);
    });
  });

  describe('setSearchQuery', () => {
    it('should call filterService when searching', () => {
      service.setBooks([book1, book2]);
      service.setSearchQuery('Book 1');
      service.filteredBooks();
      expect(mockFilterService.filterBooksByTitle).toHaveBeenCalledWith([book1, book2], 'Book 1');
    });
  });

  describe('addBook', () => {
    it('should add a book to the store', () => {
      service.addBook(book1);
      expect(service.filteredBooks()).toEqual([book1]);
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', () => {
      service.setBooks([book1]);
      const updatedBook = { ...book1, title: 'Updated' };
      service.updateBook(updatedBook, '1');
      expect(service.filteredBooks()).toEqual([updatedBook]);
    });
  });

  describe('removeBook', () => {
    it('should remove a book by id', () => {
      service.setBooks([book1, book2]);
      service.removeBook('1');
      expect(service.filteredBooks()).toEqual([book2]);
    });
  });

  describe('toggleSort', () => {
    it('should toggle sort state and call sortBooks when true', () => {
      service.setBooks([book1, book2]);
      expect(service.isSorted()).toBe(false);

      service.toggleSort();
      expect(service.isSorted()).toBe(true);
      service.filteredBooks();
      expect(mockSortService.sortBooks).toHaveBeenCalled();
      expect(service.filteredBooks()).toEqual([book2, book1]);
    });
  });
});
