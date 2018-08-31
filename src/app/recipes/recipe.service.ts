import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Smash potatoes', 'This is simply a test',
    'https://www.simplyrecipes.com/wp-content/uploads/2010/04/smashed-new-potatoes-horiz-a-1800-1024x683.jpg', [
      new Ingredient('Potatoes', 10),
      new Ingredient('Milk', 0.5),
      new Ingredient('Butter', 0.2)
    ]),
    new Recipe('Meat with potatoes', 'This is simply a test',
    'https://st.depositphotos.com/1013328/3549/i/950/depositphotos_35492053-stock-photo-pork-meat-with-potatoes.jpg', [
      new Ingredient('Potatoes', 10),
      new Ingredient('Meat', 1)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
