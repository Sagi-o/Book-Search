import { State, Store, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { Login, LoginSuccess, LoginError } from './auth.actions';
import { tap, catchError } from 'rxjs/operators';
import { SetUser } from '../user';

interface AuthStateModel {
    isLoading: boolean;
    error: any;
    loginForm: any;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isLoading: false,
        error: null,
        loginForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {}
        }
    }
})
@Injectable()
export class AuthState {
    constructor(private authService: AuthService) { }

    @Selector()
    static getIsLoading(state: AuthStateModel) {
        return state.isLoading;
    }

    @Action(Login)
    login({ patchState, dispatch, getState }: StateContext<AuthStateModel>, action: Login) {
        const { username } = getState().loginForm?.model;

        if (!username || !username?.trim()) {
            return;
        }

        patchState({ isLoading: true, error: null });

        return this.authService.login(username).pipe(
            tap(_ => {
                dispatch(new SetUser(username));
                dispatch(new LoginSuccess(username));
            }),
            catchError(error => {
                return dispatch(new LoginError(error));
            })
        );
    }

    @Action(LoginSuccess)
    loginSuccess({ patchState }: StateContext<AuthStateModel>, action: LoginSuccess) {
        patchState({ isLoading: false, error: null });
    }

    @Action(LoginError)
    loginError({ patchState }: StateContext<AuthStateModel>, action: LoginError) {
        const { error } = action;
        patchState({ isLoading: false, error });
    }
}
