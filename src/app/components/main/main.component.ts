import { Component,Input,Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/materials/products.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor() {}
  @Output() newItemEvent = new EventEmitter<number>();
  @Input('productList')
  productList!: Product[];

  
  delete(value: number){
    this.newItemEvent.emit(value);
  }
}
