import { Book } from '../search/book.model';

export class AddToWishlist {
    static type = '[Search] Add To Wishlist';
    constructor(public book: Book) {}
}

export class RemoveFromWishlist {
    static type = '[Search] Remove From Wishlist';
    constructor(public bookId: string) {}
}
