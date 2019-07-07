import { product } from './../product';
import {cartService} from './cartService';
import {Component} from '@angular/core';
import { OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CartState} from './CartState';

@Component({selector: 'shopping-list', templateUrl: './shopping-list.html'})

export default class shoppingList {
    loaded : boolean = true
    products : product[];
    totalamount: number;
getTotal() {
    let total = 0;
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].price) {
            total += this.products[i].price;
            this.totalamount = total;
        }
    }
    return total;
}

    private subscription : Subscription;
    constructor(private _cartService : cartService) {}
    ngOnInit() {
        // this.loaderService.show();
        this.subscription = this
            ._cartService
            .CartState
            .subscribe((state : CartState) => {
                this.products = state.products;
                console.log(this.products);
            });

    }
    ngOnDestroy() {
        this
            .subscription
            .unsubscribe();
    }
}