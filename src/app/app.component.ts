import { Component } from '@angular/core';
import { ModalService } from './modules/shared/services/global/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-search';

  constructor(private modalService: ModalService) {}

  removeModal() {
    this.modalService.destroy();
  }
}
