export class Book {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public pages: number
    ) { }

    static create({ title, author, pages }: { title: string, author: string, pages: number }): Book {
        return new Book(crypto.randomUUID(), title.trim(), author.trim(), pages);
    }
}