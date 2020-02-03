import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { IngredientPage, Ingredient } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.scss']
})
export class AdminIngredientsComponent implements OnInit {

  ingredientText: string;

  ingredientPage: IngredientPage;
  page = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getIngredientPage();
  }

  getIngredientPage(): void {
    this.dataService.getIngredientsPage(this.page)
    .subscribe({
      next: response => {
        console.log(response);
        this.ingredientPage = { ...response };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  addIngredient(): void {
    const ingredient: Ingredient = { name: this.ingredientText };

    this.dataService.addIngredient(ingredient)
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });

    this.ingredientText = null;
    window.location.reload();
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.dataService.deleteIngredient(ingredient.id)
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });

    // window.location.reload();
  }

  changePage(page: number): void {
    this.page = page;
    this.getIngredientPage();
  }

  pageNav(): boolean {
    return typeof this.ingredientPage === 'undefined' || this.ingredientPage.totalPages < 2;
  }

}
