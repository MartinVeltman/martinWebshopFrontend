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
  item =  {} as Item;

  constructor(private itemservice: itemService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  getInputItem(name: string, description: string, price: string, imagePath: string) {
    this.item.name = name;
    this.item.description = description;
    this.item.price = Number(price);
    this.item.imagePath = imagePath;

    this.addItem();
  }

  addItem() {

    if (!this.validInput()) {
      return
    }

    this.itemservice.createNewItem(this.item);
  }

  validInput(): boolean {
    if (this.item.name.length <= 1 || this.item.description.length <= 3 || this.item.imagePath.length <= 6 || isNaN(this.item.price)) {
      this.toastr.error('Vul alle velden correct in');
      return false;
    } else if(this.item.price <= 0){
      this.toastr.error('Je bent sinterklaas niet?!');
      return false;
    }

    return true;
  }

}
