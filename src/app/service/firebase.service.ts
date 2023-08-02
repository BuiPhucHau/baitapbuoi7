import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, query  } from '@firebase/firestore';
import { Firestore, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { Product } from '../materials/products.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  products: Product[] = [];

  constructor(private firestore: Firestore) {}

  async addProduct(product : Product){

    try{
      const newProductRef = doc(collection(this.firestore, 'products'));
      await setDoc(newProductRef,{
        ...product,
        id: newProductRef.id,
      });
    }catch(error){
      console.log(error);
    }
  }

  async getProducts() {
  
    const q = query(collection(this.firestore, 'products'));
    onSnapshot(q, (querySnapshot) => {
      this.products = [];
      querySnapshot.forEach((doc) => {
        this.products.push(doc.data() as Product);
      });
      console.log('Current products: ', this.products);
    });

  }
}
