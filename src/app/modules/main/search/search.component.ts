import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, takeUntil, map } from 'rxjs/operators';
import { Search, SearchState } from 'src/app/store/main/search';
import { Book } from 'src/app/store/main/search/book.model';
import { ModalService } from '../../shared/services/global/modal.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) input: ElementRef;

  @Select(SearchState.getResults) results$: Observable<Book[]>;
  @Select(SearchState.getIsLoading) isLoading$: Observable<boolean>;

  private ngUnsubscribe = new Subject();

  constructor(private store: Store, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        map(_ => this.input.nativeElement.value),
        filter(query => query?.length),
        tap((query) => {
          this.store.dispatch(new Search(query));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onBookClicked(book: Book) {
    console.log(book);
    this.modalService.init(BookDetailsComponent, { book }, {});
  }
}
