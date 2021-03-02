import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SearchState } from './search/search.state';
import { WishlistState } from './wishlist';

// tslint:disable-next-line:no-empty-interface
export interface MainStateModel {
}

@State<MainStateModel>({
    name: 'main',
    defaults: {
    },
    children: [SearchState, WishlistState]
})
@Injectable()
export class MainState { }
