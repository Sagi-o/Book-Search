import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';



@NgModule({
  declarations: [SearchComponent, WishlistComponent, MainComponent, BookCardComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
