import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [SearchComponent, WishlistComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
