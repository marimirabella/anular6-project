import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatos', 3)
  ];

  getIngredients() {
     return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients = [
      ...this.ingredients,
      ingredient
    ];
    this.ingredientsChanged.emit([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientsChanged.emit([...this.ingredients]);
  }
}
