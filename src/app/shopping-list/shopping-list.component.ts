import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] ;
private subscription: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  onEditItem(index: number) {
    this.slService.startEditing.next(index);
  }


  // onIngredientAdded(addedIngredient: Ingredient) {
  //   if((addedIngredient.name !== '') && (addedIngredient.amount > 0 )) {
  //     this.ingredients.push(addedIngredient);
  //   }
  //   else {
  //     // alert("Please check the Name and Amount")
  //   }
  // }

}
