import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Book } from './book.model';
import { NextPage, PreviousPage, Search } from './search.actions';
import { SearchResponse, SearchService } from './search.service';

interface SearchStateModel {
    query: string;
    results: Book[];
    isLoading: boolean;
    paging: {
        startIndex: number;
        maxResults: number;
        totalItems: number;
        currentPage: number;
    };
}

@State<SearchStateModel>({
    name: 'search',
    defaults: {
        query: null,
        results: [],
        isLoading: false,
        paging: {
            startIndex: 0,
            maxResults: 20,
            totalItems: 0,
            currentPage: 0
        }
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

    @Selector()
    static getCurrenPage(state: SearchStateModel) {
        return state.paging.currentPage;
    }

    @Selector()
    static getTotalPages(state: SearchStateModel) {
        return Math.ceil(state.paging.totalItems / state.paging.maxResults);
    }

    @Action(Search)
    search({ patchState, getState }: StateContext<SearchStateModel>, action: Search) {
        const state = getState();
        const { maxResults } = state.paging;
        const { query } = action;
        patchState({ query, isLoading: true });
        return this.searchService.search(query, action.startIndex, maxResults).pipe(map((results: SearchResponse) => {
            console.log(results);
            const currentPage = Math.ceil(((action.startIndex) + maxResults) / maxResults);
            patchState({
                results: results.items || [],
                isLoading: false,
                paging: {
                    ...state.paging,
                    totalItems: results.totalItems,
                    startIndex: action.startIndex,
                    currentPage
                }
            });
        }), catchError(error => {
            console.log(error);
            return of(error);
        }));
    }

    @Action(NextPage)
    nextPage({ getState, dispatch }: StateContext<SearchStateModel>, action: NextPage) {
        const state = getState();
        const { query } = state;
        const { startIndex, maxResults, totalItems } = state.paging;
        const nextIndex = startIndex + maxResults;
        if (nextIndex >= totalItems) {
            return;
        }
        dispatch(new Search(query, nextIndex));
    }

    @Action(PreviousPage)
    previousPage({ getState, dispatch }: StateContext<SearchStateModel>, action: PreviousPage) {
        const state = getState();
        const { query } = state;
        const { startIndex, maxResults } = state.paging;
        const nextIndex = startIndex - maxResults;
        if (nextIndex < 0) {
            return;
        }
        dispatch(new Search(query, nextIndex));
    }
}
