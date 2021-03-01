import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
// import { AuthGuard } from '../shared/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    // canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
