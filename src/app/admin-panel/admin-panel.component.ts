import {Component, OnInit} from '@angular/core';
import {itemService} from "../item/item.service";
import {Item} from "../item/item.model";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [itemService]
})
export class AdminPanelComponent implements OnInit {

  // @ts-ignore
  item = new Item();

  constructor(private itemservice: itemService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  getItem() {
    this.item.name = (<HTMLInputElement>(
      document.getElementById('itemName')
    )).value;

    this.item.description = (<HTMLInputElement>(
      document.getElementById('itemDescription')
    )).value;

    this.item.price = parseFloat((<HTMLInputElement>
      document.getElementById("itemPrice")).value);

    this.item.imagePath = (<HTMLInputElement>(
      document.getElementById('itemFotoUrl')
    )).value;
  }

  addItem() {
    this.getItem();
    if (!this.validInput()) {
      return
    }

    this.itemservice.createNewItem(this.item);

  }

  validInput(): boolean {
    if (this.item.name.length <= 1 || this.item.description.length <= 3 || this.item.imagePath.length <= 6 || isNaN(this.item.price)) {
      this.toastr.error('Vul alle velden correct in');
      return false;
    }

    return true;
  }

}
