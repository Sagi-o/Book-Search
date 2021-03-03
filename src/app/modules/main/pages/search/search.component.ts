import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, takeUntil, map } from 'rxjs/operators';
import { listAnimation } from 'src/app/modules/shared/animations/list.animations';
import { ModalService } from 'src/app/modules/shared/services/global/modal.service';
import { NextPage, PreviousPage, Search, SearchState } from 'src/app/store/main/search';
import { Book } from 'src/app/store/main/search/book.model';
import { WishlistState, RemoveFromWishlist, AddToWishlist } from 'src/app/store/main/wishlist';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [listAnimation]
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) input: ElementRef;

  @Select(SearchState.getResults) results$: Observable<Book[]>;
  @Select(SearchState.getIsLoading) isLoading$: Observable<boolean>;
  @Select(SearchState.getCurrenPage) currentPage$: Observable<number>;
  @Select(SearchState.getTotalPages) totalPages$: Observable<number>;

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
    this.modalService.init(BookDetailsComponent, { book }, {});
  }

  onWishlistClick(book: Book) {
    const isFoundOnWishlist = this.store.selectSnapshot(WishlistState.isFoundOnWishlist(book.id));
    if (isFoundOnWishlist) {
      this.store.dispatch(new RemoveFromWishlist(book.id));
    } else {
      this.store.dispatch(new AddToWishlist(book));
    }
  }

  onNextPageClick() {
    this.store.dispatch(new NextPage());
  }

  onPreviousPageClick() {
    this.store.dispatch(new PreviousPage());
  }
}
