import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: []
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  // constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  // onSelected() {
    // this.recipeService.recipeSelected.emit(this.recipe);
    // this.recipeSelected.emit();
  // }
  // @Output() recipeSelected = new EventEmitter<void>();
}
