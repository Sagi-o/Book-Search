import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/store/main/search/book.model';
import { AddToWishlist, RemoveFromWishlist, WishlistState } from 'src/app/store/main/wishlist';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  @Select(WishlistState.getBooks) wishlist$: Observable<Book[]>;

  @Input() book: Book;
  @Output() wishlistClicked = new EventEmitter<Book>();

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  isFoundOnWishlist(): Observable<boolean> {
    return this.store.select(WishlistState.isFoundOnWishlist(this.book.id));
  }

  onWishlistClicked() {
    this.wishlistClicked.emit(this.book);
  }
}
