import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book.model';
import { environment } from '../../../../environments/environment';

export type SearchResponse = {
    items: Book[]
    kind: string,
    totalItems: number
};

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private readonly BOOKS_ENDPOINT = `https://www.googleapis.com/books/v1/volumes`;

    constructor(private http: HttpClient) {}

    search(query: string, startIndex: number, maxResults: number): Observable<SearchResponse> {
        return this.http.get<SearchResponse>(`${this.BOOKS_ENDPOINT}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${environment.googleApiKey}`);
    }

    getById(volumeId: string): Observable<Book> {
        return this.http.get<Book>(`${this.BOOKS_ENDPOINT}/${volumeId}`);
    }
}
