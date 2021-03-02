import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Book } from './book.model';
import { Search } from './search.actions';
import { SearchService } from './search.service';

interface SearchStateModel {
    query: string;
    results: Book[];
    isLoading: boolean;
}

@State<SearchStateModel>({
    name: 'search',
    defaults: {
        query: null,
        results: [],
        isLoading: false
    }
})
@Injectable()
export class SearchState {
    constructor(private searchService: SearchService) { }

    @Selector()
    static getIsLoading(state: SearchStateModel) {
        return state.isLoading;
    }

    @Selector()
    static getResults(state: SearchStateModel) {
        return state.results;
    }

    @Action(Search)
    search({ patchState }: StateContext<SearchStateModel>, action: Search) {
        const { query } = action;
        patchState({ isLoading: true });
        return this.searchService.search(query).pipe(map((results: Book[]) => {
            patchState({ results, isLoading: false });
        }), catchError(error => {
            console.log(error);
            return of(error);
        }));
    }

}
