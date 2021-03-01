import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from './components/global/profile-photo/profile-photo.component';
import { DropdownMenuComponent } from './components/global/dropdown-menu/dropdown-menu.component';
import { AlertComponent } from './components/global/alert/alert.component';
import { SplashComponent } from './components/global/splash/splash.component';
import { DotsComponent } from './components/global/dots/dots.component';
import { TabsComponent } from './components/global/tabs/tabs.component';
import { VolunteerGaugeComponent } from './components/global/volunteer-gauge/volunteer-gauge.component';
import { FormsModule } from '@angular/forms';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { DefaultImageDirective } from './directives/default-image.directive';
import { SwitchComponent } from './components/global/switch/switch.component';
import { LoadingBarComponent } from './components/global/loading-bar/loading-bar.component';
import { MyDatePipe } from './pipes/my-date.pipe';
import { MyHourPipe } from './pipes/my-hour.pipe';
import { ControlErrorComponent } from './components/global/control-error/control-error.component';
import { ExpansionPanelComponent } from './components/global/expansion-panel/expansion-panel.component';
import { ExpansionPanelItemComponent } from './components/global/expansion-panel/expansion-panel-item/expansion-panel-item.component';
import { StarsRatingComponent } from './components/global/stars-rating/stars-rating.component';
import { DialogComponent } from './components/global/dialog/dialog.component';
import { NavbarUpgradeComponent } from './components/global/navbar-upgrade/navbar-upgrade.component';
import { NotAvailableInLocationComponent } from './components/global/not-available-in-location/not-available-in-location.component';
import { LazyImgDirective } from './directives/lazy-image.directive';
import { HttpClientModule } from '@angular/common/http';
import { ImageSliderComponent } from './components/global/image-slider/image-slider.component';
import { ProgressIndicatorComponent } from './components/global/progress-indicator/progress-indicator.component';
import { InfiniteScrollComponent } from './components/global/infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [ProfilePhotoComponent, DropdownMenuComponent, AlertComponent, SplashComponent, DotsComponent,
    TabsComponent, VolunteerGaugeComponent, DefaultImageDirective, SwitchComponent,
    LoadingBarComponent, MyDatePipe, MyHourPipe, ControlErrorComponent, ControlErrorsDirective, FormSubmitDirective,
    ExpansionPanelComponent, ExpansionPanelItemComponent, StarsRatingComponent, DialogComponent, NavbarUpgradeComponent,
    NotAvailableInLocationComponent, LazyImgDirective, ImageSliderComponent, ProgressIndicatorComponent, InfiniteScrollComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ProfilePhotoComponent, DropdownMenuComponent, AlertComponent, SplashComponent, TabsComponent,
    DefaultImageDirective, SwitchComponent, LoadingBarComponent, MyDatePipe,
    MyHourPipe, ControlErrorComponent, ControlErrorsDirective, FormSubmitDirective, ExpansionPanelComponent,
    ExpansionPanelItemComponent, StarsRatingComponent, DotsComponent, DialogComponent, NavbarUpgradeComponent,
    NotAvailableInLocationComponent, LazyImgDirective, ProgressIndicatorComponent, InfiniteScrollComponent],
  entryComponents: [ControlErrorComponent],
})
export class SharedModule { }
