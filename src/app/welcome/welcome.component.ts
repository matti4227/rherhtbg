import { Component, OnInit } from '@angular/core';
import { RecipePage, Ingredient } from '../shared/interfaces';
import { FilterData } from '../filter/filter-data';
import { DataService } from '../core/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  recipePage: RecipePage;
  filterData: FilterData;
  selectedIngredients: Ingredient[];
  page: number;
  totalPages: number;
  searchText: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.setDefaultParameters();

    this.route.data.subscribe(data => {
      const resolvedData: RecipePage = data['resolvedData'];
      this.onRecipesRetrieved(resolvedData);
    });
  }

  onRecipesRetrieved(recipePage: RecipePage): void {
    this.recipePage = recipePage;
    this.totalPages = this.recipePage.totalPages;
  }

  getRecipes(): void {
    this.dataService.getRecipesByParameters(
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
        },
        error: error => {
          this.toastr.error('Nie udało się pobrać przepisów.', 'Wystąpił problem!', {
            positionClass: 'toast-top-center'
          });
        }
      });
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
    this.searchText = '';
  }

  searchRecipes(filter: any): void {
    this.filterData = { ...filter.getData() };
    this.filterData.search = this.searchText;
    this.selectedIngredients = [];
    this.getRecipes();
  }


  previousPage(): void {
    this.page = this.page - 1;
    this.getRecipes();
  }

  nextPage(): void {
    this.page = this.page + 1;
    this.getRecipes();
  }

  goToPage(page: number): void {
    this.page = this.page + page;
    this.getRecipes();
  }

  selectPage(page: number): void {
    this.page = page;
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
