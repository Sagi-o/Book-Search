import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/store/main/search/book.model';
import { AddToWishlist, RemoveFromWishlist, WishlistState } from 'src/app/store/main/wishlist';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Output() clicked = new EventEmitter<Book>();
  @Output() wishlistClicked = new EventEmitter<Book>();

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  isFoundOnWishlist(): Observable<boolean> {
    return this.store.select(WishlistState.isFoundOnWishlist(this.book.id));
  }

  onBookClick($event: any) {
    if ($event.target.id === 'wishlist-icon') {
      this.wishlistClicked.emit(this.book);
      return;
    }
    this.clicked.emit(this.book);
  }
}
