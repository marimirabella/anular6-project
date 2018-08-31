import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 2),
  //   new Ingredient('Tomatos', 3)
  // ];
  // onIngredientAdded(ingredient: Ingredient) {
    //  this.ingredients = [
    //   ...this.ingredients,
    //   ingredient
    // ];
  // }
}
