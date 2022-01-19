import {Component, OnInit} from '@angular/core';
import {itemService} from "../item/item.service";
import {Item} from "../item/item.model";


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  providers: [itemService]
})
export class ShoppingcartComponent implements OnInit {

  itemsInCart: Item[] = [];
  totalPrice: number = 0;

  constructor(private itemService: itemService) {
  }

  ngOnInit(): void {
    console.log(this.itemService.getCart());
    // @ts-ignore
    this.itemsInCart = this.itemService.getCart();

  }

  ngDoCheck(){
    if(this.itemsInCart.length > 0){
      this.getTotal(this.itemsInCart);
    }
  }

  deleteItem(index: number){
    this.itemsInCart.splice(index, 1);
    this.itemService.setCartData(this.itemsInCart);
  }

  validateInput(event: any, index:number){
    const qty = +event.target.value;
    if(qty < 1){
      event.target.value = this.itemsInCart[index].qty;
      return;
    }

    this.qtyUpdate(qty, index)
  }

  private qtyUpdate(qty: number, index:number){
    this.itemsInCart[index].qty = qty;
    this.itemService.setCartData(this.itemsInCart);

  }

  getTotal(items: Item[]){
    let price = 0;
    for(const item of items){
      price += item.price * item.qty;


      this.totalPrice = Number(Number(Math.round(price * 100) / 100).toFixed(2));
    }
  }

  displayCart():boolean{
    if(this.itemsInCart === null || this.itemsInCart.length < 1){
      return false;
    }else {
      return true;
    }
  }


}
