import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    // private readonly BOOKS_ENDPOINT = `AIzaSyCB3mqn5L5sDSb4nuBYFhcyjsiYSgE-8iA`;
    private readonly BOOKS_ENDPOINT = `https://www.googleapis.com/books/v1/volumes`;

    constructor(private http: HttpClient) {}

    search(query: string): Observable<Book[]> {
        return this.http
               .get<{ items: Book[] }>(`${this.BOOKS_ENDPOINT}?q=${query}&key=${environment.googleApiKey}`)
               .pipe(map(books => books.items || []));
    }

    getById(volumeId: string): Observable<Book> {
        return this.http.get<Book>(`${this.BOOKS_ENDPOINT}/${volumeId}`);
    }
}
