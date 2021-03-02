import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/store/main/search/book.model';
import { WishlistState } from 'src/app/store/main/wishlist';
import { ModalService } from '../../shared/services/global/modal.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  @Select(WishlistState.getBooks) wishlist$: Observable<Book[]>;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onBookClicked(book: Book) {
    console.log(book);
    this.modalService.init(BookDetailsComponent, { book }, {});
  }
}
