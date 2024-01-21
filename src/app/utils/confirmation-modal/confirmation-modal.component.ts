import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductViewModel } from 'src/app/viewModel/product.viewmodel';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() modalData !: any;
  @Output() saveChanges = new EventEmitter<ProductViewModel>();

  constructor(public activeModal: NgbActiveModal) {}

  delete() {
    this.saveChanges.emit(this.modalData.value);
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
