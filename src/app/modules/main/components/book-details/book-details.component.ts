import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/store/main/search/book.model';
import { WishlistState } from 'src/app/store/main/wishlist';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  @Input() book: Book;
  @Input() isFoundOnWishlist: Observable<boolean>;

  @Output() wishlistClicked = new EventEmitter<Book>();

  constructor() { }

  ngOnInit(): void {
  }

  onWishlistClicked() {
    this.wishlistClicked.emit(this.book);
  }
}
