import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Item} from "./item/item.model";

@Injectable({
  providedIn: 'root'
})
export class messengerService{

  subject = new Subject();
  constructor() {
  }

  sendMsg(item: Item){
    this.subject.next(item);
  }

  getMsg(){
    return this.subject.asObservable();
  }

}
