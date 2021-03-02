import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from './components/global/profile-photo/profile-photo.component';
import { AlertComponent } from './components/global/alert/alert.component';
import { DotsComponent } from './components/global/dots/dots.component';
import { FormsModule } from '@angular/forms';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { SwitchComponent } from './components/global/switch/switch.component';
import { LoadingBarComponent } from './components/global/loading-bar/loading-bar.component';
import { MyDatePipe } from './pipes/my-date.pipe';
import { MyHourPipe } from './pipes/my-hour.pipe';
import { ControlErrorComponent } from './components/global/control-error/control-error.component';
import { StarsRatingComponent } from './components/global/stars-rating/stars-rating.component';
import { DialogComponent } from './components/global/dialog/dialog.component';
import { LazyImgDirective } from './directives/lazy-image.directive';
import { HttpClientModule } from '@angular/common/http';
import { ProgressIndicatorComponent } from './components/global/progress-indicator/progress-indicator.component';
import { InfiniteScrollComponent } from './components/global/infinite-scroll/infinite-scroll.component';
import { SidebarComponent } from './components/global/sidebar/sidebar.component';

@NgModule({
  declarations: [ProfilePhotoComponent, AlertComponent, DotsComponent,
    SwitchComponent, LoadingBarComponent, MyDatePipe, MyHourPipe, ControlErrorComponent,
    ControlErrorsDirective, FormSubmitDirective,
    StarsRatingComponent, DialogComponent, LazyImgDirective, ProgressIndicatorComponent, InfiniteScrollComponent,
    SidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ProfilePhotoComponent, AlertComponent,
    SwitchComponent, LoadingBarComponent, MyDatePipe,
    MyHourPipe, ControlErrorComponent, ControlErrorsDirective, FormSubmitDirective, StarsRatingComponent,
    DotsComponent, DialogComponent, LazyImgDirective, ProgressIndicatorComponent, InfiniteScrollComponent,
    SidebarComponent],
  entryComponents: [ControlErrorComponent],
})
export class SharedModule { }
