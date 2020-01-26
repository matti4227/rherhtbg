import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { RecipePage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-recipes',
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
export class UserRecipesComponent implements OnInit {

  recipePage: RecipePage;
  page = 0;
  size = 3;

  @Input() username: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log(this.username)
    this.getUserRecipes();
  }

  getUserRecipes(): void {
    this.dataService.getUserRecipes(this.username, this.page, this.size)
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
    this.getUserRecipes();
  }

  pageNav(): boolean {
    return typeof this.recipePage === 'undefined' || this.recipePage.totalPages < 2;
  }

}
