import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/data.service';
import { Recipe, RecipeIngredient, RecipeResolved } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';

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
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: RecipeResolved = data['resolvedData'];
      this.onRecipeRetrieved(resolvedData.recipe);
    });
  }

  onRecipeRetrieved(recipe: Recipe): void {
    this.recipe = { ...recipe };
    this.currentRate = this.recipe.userRate;
    this.difficulty = this.getDifficultyName(this.recipe.difficulty);
    this.prepTime = this.getPrepTimeName(this.recipe.preparationTime);
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
    if (prepTime === 1) {
      return 'do 30 min';
    } else if (prepTime === 2) {
      return '30 do 60 min';
    } else if (prepTime === 3) {
      return 'powyżej 60 min';
    }
  }

  commentRecipe(): void {
    this.dataService.commentRecipe({ comment: this.comment }, this.recipe.id)
      .subscribe({
        next: response => {
          this.toastr.success('Skomentowano!', '', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          window.location.reload();
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
          this.toastr.success('Oceniono!', '', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        },
        error: error => {
          console.error(error);
        }
      });
  }

  addToCookbook(): void {
    this.dataService.addRecipeToCookbook(this.recipe.id)
    .subscribe({
      next: response => {
        this.toastr.success('Dodano do ulubionych!', '', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        window.location.reload();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  removeFromCookbook(): void {
    this.dataService.removeRecipeFromCookbook(this.recipe.id)
    .subscribe({
      next: response => {
        this.toastr.success('Usunięto z ulubionych!', '', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        window.location.reload();
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
