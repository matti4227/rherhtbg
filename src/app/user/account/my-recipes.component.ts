import { Component, OnInit } from '@angular/core';
import { RecipePage } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-my-recipes',
  template: `
    <div class="recipes">

      <app-recipe-list [recipePage]="recipePage"></app-recipe-list>

      <div class="page-nav" *ngIf="!pageNav()">
        <app-page-nav
          [page]="recipePage?.currentPage"
          [totalPages]="recipePage?.totalPages"
          (changePage)="changePage($event)">
        </app-page-nav>
      </div>

    </div>
  `,
  styles: []
})
export class MyRecipesComponent implements OnInit {

  recipePage: RecipePage;
  page = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getOwnRecipes();
  }

  getOwnRecipes(): void {
    this.dataService.getOwnRecipes(this.page)
    .subscribe({
      next: response => {
        console.log(response);
        this.recipePage = { ...response };
      },
      error: error => {
        console.error(error);
      }
    });
  }

  changePage(page: number): void {
    this.page = page;
    this.getOwnRecipes();
  }

  pageNav(): boolean {
    return typeof this.recipePage === 'undefined' || this.recipePage.totalPages < 2;
  }
}
