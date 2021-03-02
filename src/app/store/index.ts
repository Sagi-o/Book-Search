import { AuthState } from './auth';
import { UserState } from './user';
import { SidebarState } from './sidebar';
import { MainState } from './main';
import { SearchState } from './main/search';
import { WishlistState } from './main/wishlist';

// Still allow other modules to take what they need, eg action & selectors
// export * from './auth';
// export * from './user';

// rolls up our states into one const
export const appState = [
    AuthState,
    UserState,
    SidebarState,
    MainState,
    SearchState,
    WishlistState
];
