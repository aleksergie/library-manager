import { Injectable } from "@angular/core";
import { Book } from "../models";

@Injectable({ providedIn: 'root' })
export class SortService {
    public sortBooks(books: Book[]): Book[] {
        const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

        return [...books].sort((a, b) => {
            const authorCompare = collator.compare(a.author, b.author);
            if (authorCompare !== 0) {
                return authorCompare;
            }
            return collator.compare(a.title, b.title);
        });
    }
}