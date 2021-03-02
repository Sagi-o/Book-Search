import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { AddToWishlist, RemoveFromWishlist } from './wishlist.actions';

interface WishlistStateModel {
    items: any[];
}

@State<WishlistStateModel>({
    name: 'wishlist',
    defaults: {
        items: []
    }
})
@Injectable()
export class WishlistState {
    constructor() { }

    @Selector()
    static getItems(state: WishlistStateModel) {
        return state.items;
    }

    @Action(AddToWishlist)
    addToWishlist({ patchState, dispatch, getState }: StateContext<WishlistStateModel>, action: AddToWishlist) {
        const item = action.item;
        const items = [item, ...getState().items];
        patchState({ items });
    }

    @Action(RemoveFromWishlist)
    removeFromWishlist({ patchState, dispatch, getState }: StateContext<WishlistStateModel>, action: RemoveFromWishlist) {
        // const item = action.item;
        // const items = [item, ...getState().items];
        // patchState({ items });
    }
}
