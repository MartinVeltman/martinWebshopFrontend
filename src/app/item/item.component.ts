import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Item} from "./item.model";
import {itemService} from "./item.service";
import {ToastrService} from "ngx-toastr";
import {authenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [itemService, authenticationService]
})
export class ItemComponent implements OnInit {
  items: Item[] = [];


  constructor(private itemService: itemService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.itemService.getItemsFromDB()
      .subscribe
      ((data: Item[]) => {
          this.items = data
        }
      )

  }


  addToCart(id: number) {
    // @ts-ignore
    this.itemService.addItemToCart(this.items.find(e => e.id === id));
    this.toastr.success('Product aan winkelmand toegevoegd');
  }


}
