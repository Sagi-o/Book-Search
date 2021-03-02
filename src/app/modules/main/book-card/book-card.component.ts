import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/store/main/search/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Output() clicked = new EventEmitter<Book>();

  constructor() { }

  ngOnInit(): void {
  }

  onBookClick() {
    this.clicked.emit(this.book);
  }
}
