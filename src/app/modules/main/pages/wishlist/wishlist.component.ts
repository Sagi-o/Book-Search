import { Component, EventEmitter, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { listAnimation } from 'src/app/modules/shared/animations/list.animations';
import { ModalService } from 'src/app/modules/shared/services/global/modal.service';
import { Book } from 'src/app/store/main/search/book.model';
import { AddToWishlist, RemoveFromWishlist, WishlistState } from 'src/app/store/main/wishlist';
import { BookDetailsComponent } from '../../components/book-details/book-details.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  animations: [listAnimation]
})
export class WishlistComponent implements OnInit {
  @Select(WishlistState.getBooks) wishlist$: Observable<Book[]>;

  private ngUnsubscribe = new Subject();

  private wishlistClicked: EventEmitter<any> = new EventEmitter<Book>();

  constructor(private modalService: ModalService, private store: Store) { }

  ngOnInit(): void {
    this.wishlistClicked.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(book => {
      this.onWishlistClick(book);
    });
  }

  onWishlistClick(book: Book) {
    const isFoundOnWishlist = this.store.selectSnapshot(WishlistState.isFoundOnWishlist(book.id));
    if (isFoundOnWishlist) {
      this.store.dispatch(new RemoveFromWishlist(book.id));
    } else {
      this.store.dispatch(new AddToWishlist(book));
    }
  }

  onBookClicked(book: Book) {
    this.modalService.init(BookDetailsComponent, { book, wishlistClicked: this.wishlistClicked }, {});
  }
}
