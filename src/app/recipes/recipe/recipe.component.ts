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

  currentRate = 0;
  hoveredRate = 0;

  recipe: Recipe;
  recipeIngredients: RecipeIngredient[];

  difficulty: string;
  prepTime: string;

  comments: Comment[];
  comment: string;

  defaultImage = 'assets/blank_portrait.png';

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);

      this.dataService.getRecipe(id)
      .subscribe({
        next: response => {
          this.recipe = { ...response };
          this.currentRate = this.recipe.userRate;
          this.difficulty = this.getDifficultyName(this.recipe.difficulty);
          this.prepTime = this.getPrepTimeName(this.recipe.preparationTime);
          console.log(this.recipe)
        },
        error: error => {
          console.error(error);
        }
      });

   });

  //  this.starConfig.max = 5;
  }

  getDifficultyName(difficulty: number): string {
    if (difficulty === 1) {
      return 'łatwe';
    } else if (difficulty === 2) {
      return 'średnie';
    } else if (difficulty === 3) {
      return 'trudne';
    }
  }

  getPrepTimeName(prepTime: number): string {
    if (prepTime === 30) {
      return 'do 30 min';
    } else if (prepTime === 3060) {
      return '30 do 60 min';
    } else if (prepTime === 60) {
      return 'powyżej 60 min';
    }
  }

  // setDifficulty(): void {
  //   if (this.recipe.difficulty === 1) {
  //     this.difficulty = this.difficulties[0];
  //   } else if (this.recipe.difficulty === 2) {
  //     this.difficulty = this.difficulties[1];
  //   } else if (this.recipe.difficulty === 3) {
  //     this.difficulty = this.difficulties[2];
  //   }
  // }

  // setPrepTime(): void {
  //   if (this.recipe.preparationTime === 1) {
  //     this.prepTime = this.prepTimes[0];
  //   } else if (this.recipe.preparationTime === 2) {
  //     this.prepTime = this.prepTimes[1];
  //   } else if (this.recipe.preparationTime === 3) {
  //     this.prepTime = this.prepTimes[2];
  //   }
  // }

  commentRecipe(): void {
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

  rateRecipe(): void {
    this.dataService.rateRecipe({ score: this.currentRate }, this.recipe.id)
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
