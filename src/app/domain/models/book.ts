export class Book {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public pages: number,
  ) {}

  static create({ title, author, pages }: BookInput): Book {
    return new Book(crypto.randomUUID(), title.trim(), author.trim(), pages);
  }
}

export type BookInput = Exclude<Book, 'id'>;

export interface ImportResult {
  books: BookInput[];
}
