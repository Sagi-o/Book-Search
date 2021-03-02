import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action, createSelector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Book } from '../search/book.model';
import { AddToWishlist, RemoveFromWishlist } from './wishlist.actions';

interface WishlistStateModel {
    books: Book[];
}

@State<WishlistStateModel>({
    name: 'wishlist',
    defaults: {
        books: []
    }
})
@Injectable()
export class WishlistState {
    constructor() { }

    @Selector()
    static getBooks(state: WishlistStateModel) {
        return state.books;
    }

    static isFoundOnWishlist(bookId: string) {
        return createSelector([WishlistState], (state: WishlistStateModel) => {
            return state.books.find(item => item.id === bookId) ? true : false;
        });
    }

    @Action(AddToWishlist)
    addToWishlist({ patchState, dispatch, getState }: StateContext<WishlistStateModel>, action: AddToWishlist) {
        const { book } = action;
        const books = [book, ...getState().books];
        patchState({ books });
    }

    @Action(RemoveFromWishlist)
    removeFromWishlist({ patchState, dispatch, getState }: StateContext<WishlistStateModel>, action: RemoveFromWishlist) {
        const { bookId } = action;
        const { books } = getState();
        patchState({ books: books.filter(book => book.id !== bookId) });
    }
}
