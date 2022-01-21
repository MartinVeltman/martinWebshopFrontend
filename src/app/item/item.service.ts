import {Injectable} from "@angular/core";
import {Item} from "./item.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class itemService {

  baseUrl: string = "http://localhost:8080/api/v1";

  items: Item[] = [];

  shoppingCartAmount: number = 0;
  numOfItems = new BehaviorSubject([])
  storedCart: Item[] = [];
  placeholder = [];

  subject = new Subject();


  constructor(private http: HttpClient,
              private toastr: ToastrService
  ) {
    const product = JSON.parse(<any>localStorage.getItem('cart'));   //kijkt of er data is in localstorage
    if (product) {
      this.numOfItems.next(product);         //als dat zo is word de data geemit
    }
  }

  public addItems(name: string,
                  description: string,
                  price: number,
                  imagePath: string,
                  id: number,
                  qty: number) {

    this.items.push({name: name, description: description, price: price, imagePath: imagePath, id: id, qty: qty});
  }

  getItems() {
    return this.items;
  }

  getItem(id: number) {
    return this.items.find(item =>
      item.id === id);
  }

  addItemToCart(item: Item) {
    const product = JSON.parse(<any>localStorage.getItem('cart'));
    let productExist: Item;

    if (product) { //kijkt of de item die je toevoegd al bestaat
      productExist = product.find((product: { id: number; }) => {
        return product.id === item.id
      })
    }
    // @ts-ignore
    if (productExist) {  //als deze al bestaat verhoog alleen de qty
      productExist.qty++;
      this.setCartData(product);

    } else { //als het item nog niet bestaat
      if (product) {
        const newData = [...product, item]; //als er al data is pak de huidige data en creeer een nieuw array
        this.setCartData(newData)
        this.numOfItems.next(JSON.parse(<any>localStorage.getItem('cart')))
      } else {
        // @ts-ignore
        this.placeholder.push(item);  //als er geen data is maak een nieuw array en stuur het
        this.setCartData(this.placeholder)
        this.numOfItems.next(this.placeholder);

      }
    }

  }

  getCart(): Item[] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('cart'));

  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  public createNewItem(item: Item) {
    // @ts-ignore
    const token = Object.values(JSON.parse(localStorage.getItem('jwtKey'))).toString();

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }

    return this.http.post<Item>(
      this.baseUrl + "/admin/createItem"
      , item
      , options)
      .subscribe({
        next: () => this.toastr.success('Product succesvol toegevoegd'),
        error: () => this.toastr.error('Product toevoegen mislukt')
      });

  }

  public getItemsFromDB(): Observable<Item []> {
    return this.http.get<Item []>(this.baseUrl + "/user/getItems");

  }

  public orderItem(username: string, orderValue: number) {
    return this.http.patch(
      this.baseUrl + `/user/createOrder?username=${username}&orderValue=${orderValue}`
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',

        })
      }).subscribe({
      next: () => this.orderSucces(), //TODO: winkelmandje legen hier
      error: () => this.toastr.error('Bestelling plaatsen mislukt, bent u wel ingelogd ?')
    });
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async loadPage() {
    this.toastr.success('Bestelling succesvol geplaats, knallen maar!');
    await this.delay(3000);
    window.location.reload();
  }

  orderSucces() {
    this.loadPage();
  }

}
