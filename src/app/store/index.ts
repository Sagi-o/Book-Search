import { AuthState } from './auth';
import { UserState } from './user';

// Still allow other modules to take what they need, eg action & selectors
export * from './auth';
export * from './user';

// rolls up our states into one const
export const appState = [
    AuthState,
    UserState
];
