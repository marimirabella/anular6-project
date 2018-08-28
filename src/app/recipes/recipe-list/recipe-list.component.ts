import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
   // array of recipes
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test',
    'https://therecipecritic.com/wp-content/uploads/2016/08/swedishmeatballs33-650x975.jpg'),
    new Recipe('A test recipe', 'This is simply a test',
    'https://therecipecritic.com/wp-content/uploads/2016/08/swedishmeatballs33-650x975.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
