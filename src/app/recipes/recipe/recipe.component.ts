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

  difficulties = ['łatwe', 'średnie', 'trudne'];
  difficulty: string;
  prepTimes = ['do 30 min', '30 do 60 min', 'powyżej 60 min'];
  prepTime: string;

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
          this.setDifficulty();
          this.setPrepTime();
          console.log(this.recipe)
        },
        error: error => {
          console.error(error);
        }
      });

   });
  }

  setDifficulty(): void {
    if (this.recipe.difficulty === 1) {
      this.difficulty = this.difficulties[0];
    } else if (this.recipe.difficulty === 2) {
      this.difficulty = this.difficulties[1];
    } else if (this.recipe.difficulty === 3) {
      this.difficulty = this.difficulties[2];
    }
  }

  setPrepTime(): void {
    if (this.recipe.preparationTime === 1) {
      this.prepTime = this.prepTimes[0];
    } else if (this.recipe.preparationTime === 2) {
      this.prepTime = this.prepTimes[1];
    } else if (this.recipe.preparationTime === 3) {
      this.prepTime = this.prepTimes[2];
    }
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
