import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
// import { AuthGuard } from '../shared/services/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  // canActivate: [AuthGuard],
  children:
    [
      {
        path: '',
        component: SearchComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
