import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  // ingredientsChanged = new EventEmitter<Ingredient[]>();

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
    this.ingredientsChanged.next([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientsChanged.next([...this.ingredients]);
  }
}
