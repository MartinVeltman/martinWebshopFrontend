import {Component} from '@angular/core';
import {itemService} from "./item/item.service";

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [itemService]
})
export class AppComponent {
  title = 'webshop';

  numOfCartItems: number | undefined;

  constructor(private itemService: itemService) {
  }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.itemService.numOfItems.subscribe(d => {
      this.numOfCartItems = d.length;
    })
  }


}
