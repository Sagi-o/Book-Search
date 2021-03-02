import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SetSelectedSidebarItem, SidebarState } from 'src/app/store/sidebar';
import { SidebarItem } from 'src/app/store/sidebar/sidebar-item.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @Select(SidebarState.getItems) items$: Observable<SidebarItem[]>;
  @Select(SidebarState.getSelectedSidebarItem) selected$: Observable<string>;
  @Select(SidebarState.getTitle) title$: Observable<string>;

  private ngUnsubscribe = new Subject();

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const sidebarItemFromUrl = this.getSelectedSidebarItemFromUrl(event.url);
          if (!sidebarItemFromUrl) { return; }
          this.store.dispatch(new SetSelectedSidebarItem(sidebarItemFromUrl));
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSidebarItemClick(item: SidebarItem) {
    this.router.navigate([item.link], { relativeTo: this.route });
  }

  getSelectedSidebarItemFromUrl(url: string): string {
    let startIndex = url.lastIndexOf('/main/');
    if (startIndex === -1) {
      if (url.lastIndexOf('/main') !== -1) {
        return 'main';
      }
      return null;
    }
    startIndex += 6;
    let endSlashIndex = url.substr(startIndex).indexOf('/');
    let substr = '';
    if (endSlashIndex === -1) {
      substr = url.slice(startIndex);
    } else {
      // Add original length
      endSlashIndex += startIndex;
      substr = url.slice(startIndex, endSlashIndex);
    }
    return substr;
  }
}
