import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/store/main/search/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Input() isFoundOnWishlist: boolean;

  @Output() clicked = new EventEmitter<Book>();
  @Output() wishlistClicked = new EventEmitter<Book>();

  constructor() { }

  ngOnInit(): void {
  }

  onBookClick($event: any) {
    if ($event.target.id === 'wishlist-icon') {
      this.wishlistClicked.emit(this.book);
      return;
    }
    this.clicked.emit(this.book);
  }
}
