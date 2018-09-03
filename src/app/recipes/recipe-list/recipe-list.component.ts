import { Component, OnInit } from '@angular/core';
import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: []
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  // Before services
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

   // array of recipes
  // recipes: Recipe[] = [
  //   new Recipe('A test recipe', 'This is simply a test',
  //   'https://therecipecritic.com/wp-content/uploads/2016/08/swedishmeatballs33-650x975.jpg'),
  //   new Recipe('Another test recipe', 'This is simply a test',
  //   'https://therecipecritic.com/wp-content/uploads/2016/08/swedishmeatballs33-650x975.jpg')
  // ];

  // onRecipeSelected(recipe: Recipe) { 
  //   this.recipeWasSelected.emit(recipe);
  // }
}
