import { AuthState } from './auth';
import { UserState } from './user';
import { SidebarState } from './sidebar';
import { MainState } from './main';
import { SearchState } from './main/search';
import { WishlistState } from './main/wishlist';

// rolls up our states into one const
export const appState = [
    AuthState,
    UserState,
    SidebarState,
    MainState,
    SearchState,
    WishlistState
];
