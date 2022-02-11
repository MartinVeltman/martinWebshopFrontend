import {Injectable} from "@angular/core";
import {Item} from "./item.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class itemService {

  // baseUrl: string = "https://springbootbackend-martin.herokuapp.com/api/v1"; TODO: weghalen wanneer app wordt geployed
  baseUrl: string = "http://localhost:8080/api/v1";

  items: Item[] = [];

  shoppingCartAmount: number = 0;
  numOfItems = new BehaviorSubject([])
  storedCart: Item[] = [];
  placeholder: Item[] = [];

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

  addItemToCart(item: Item | undefined) {
    const product = JSON.parse(<any>localStorage.getItem('cart'));
    let productExist: Item | undefined;

    if(item == undefined){
      return;
    }

    if (product) { //kijkt of de item die je toevoegd al bestaat
      productExist = product.find((product: { id: number; }) => {
        return product.id === item.id
      })
    }

    if (productExist) {  //als deze al bestaat verhoog alleen de qty
      productExist.qty++;
      this.setCartData(product);

    } else { //als het item nog niet bestaat
      if (product) {
        const newData = [...product, item]; //als er al data is pak de huidige data en creeer een nieuw array
        this.setCartData(newData)
        this.numOfItems.next(JSON.parse(<any>localStorage.getItem('cart')))
      } else {
        this.placeholder.push(item);  //als er geen data is maak een nieuw array en stuur het
        this.setCartData(this.placeholder)
      }
    }

  }

  getCart(): Item[] {
    return JSON.parse(<any>localStorage.getItem('cart'));
  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  getJwtToken() {
    if (localStorage.getItem('jwtKey') != null || localStorage.getItem('jwtKey') != undefined) {
      const token = Object.values(JSON.parse(<string>localStorage.getItem('jwtKey'))).toString();
      return token;
    } else {
      this.toastr.info('Je bent niet ingelogd')
      return false;
    }
  }

  public createNewItem(item: Item) {

    if (!this.getJwtToken()) {
      return;
    }

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getJwtToken())
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
    return this.http.get<Item []>(this.baseUrl + "/getItems");

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
