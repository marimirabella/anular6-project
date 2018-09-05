import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: []
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChaged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
