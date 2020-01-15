import { RecipeIngredient } from './../recipe-ingredient';
import { Comment } from './../comment';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;
  recipeIngredients: RecipeIngredient[];
  comments: Comment[];
  comment: string;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);

      this.recipesService.getRecipe(id)
      .subscribe({
        next: response => {
          console.log(response);
          this.recipe = { ...response };
          console.log(this.recipe)
        },
        error: error => {
          console.error(error);
        }
      });

   });
  }

  commentRecipe(): void {
    console.log({ comment: this.comment })
    this.recipesService.commentRecipe({ comment: this.comment }, this.recipe.id)
      .subscribe({
        next: response => {
          console.log(response);
          console.log(this.recipe);
        },
        error: error => {
          console.error(error);
        }
      });
  }

  recipeExists(): boolean {
    return typeof this.recipe === 'undefined';
  }

}
