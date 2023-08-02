import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/materials/products.model';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit,OnDestroy{

  products: Product[] = [];

  @Output() newItemEvent = new EventEmitter<Product>();

  constructor(public firebaseservice : FirebaseService) {
  }

  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  openDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id: new FormControl(Date.now(), [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      imgSrc: new FormControl(
        '', [Validators.required]
      ),
    });
    
  }

  getProducts(value: Product){
    this.firebaseservice.getProducts();

  }

  addProduct(value: Product) {
    // this.dialog.nativeElement.close();
    this.firebaseservice.addProduct(value);
    // this.newItemEvent.emit(value);
    console.log(value);
  }
  ngOnDestroy(): void {
  }
}
