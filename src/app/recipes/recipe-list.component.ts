import { Ingredient } from './../fridge/ingredient';
import { FilterData } from './filter/filter-data';
import { RecipePage } from './recipe-page';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipePage: RecipePage;
  filterData: FilterData;
  selectedIngredients: Ingredient[];
  page: number;
  totalPages: number;
  searchText: string;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.setDefaultParameters();
    this.getRecipes();
  }

  getRecipes(): void {
    console.log(this.page);
    this.recipesService.getRecipesByParameters(
      this.filterData.search,
      this.filterData.category,
      this.filterData.difficulty,
      this.filterData.prepTime,
      this.filterData.sort,
      this.page, this.selectedIngredients)
      .subscribe({
        next: response => {
          this.recipePage = response;
          this.totalPages = this.recipePage.totalPages;
          console.log(response);
          console.log(this.recipePage);
          console.log(this.recipePage.currentPage);
        },
        error: error => {
          console.error(error);
        }
      });
  }

  searchRecipes(filter, fridge): void {
    this.filterData = { ...filter.getData() };
    this.filterData.search = this.searchText;
    this.selectedIngredients = [];
    for (let data of fridge.getData()) {
      this.selectedIngredients.push(data);
    }
    console.log(this.filterData);
    console.log(this.selectedIngredients);
    console.log(this.searchText);
    this.getRecipes();
  }

  setDefaultParameters(): void {
    this.filterData = new FilterData();
    this.filterData.search = '';
    this.filterData.category = '';
    this.filterData.difficulty = 0;
    this.filterData.prepTime = 0;
    this.filterData.sort = 0;
    this.page = 0;
    this.totalPages = 0;
    this.selectedIngredients = [];
  }

  previousPage(): void {
    this.page = this.page - 1;
    this.getRecipes();
  }

  nextPage(): void {
    this.page = this.page + 1;
    this.getRecipes();
  }

  checkPreviousPage(): boolean {
    return !(this.page > 0);
  }

  checkNextPage(): boolean {
    return !(this.page < this.totalPages - 1);
  }

  searchDisabled(): boolean {
    return typeof this.searchText === 'undefined' || this.searchText.length === 0;
  }

  pageNav(): boolean {
    return typeof this.recipePage === 'undefined' || this.recipePage.totalPages < 2;
  }
}
