import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/data.service';
import { Recipe, RecipeIngredient } from 'src/app/shared/interfaces';

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

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);

      this.dataService.getRecipe(id)
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
    this.dataService.commentRecipe({ comment: this.comment }, this.recipe.id)
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
