import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { RecipePage } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-recipes',
  template: `
    <div class="recipes container">
      <app-recipe-list [recipePage]="recipePage"></app-recipe-list>

      <div *ngIf="recipePage.totalResults === 0" style="margin: 20px;">
        <legend style="text-align: center;">Brak przepisów użytkownika</legend>
      </div>

      <div class="page-nav" style="margin-top: 20px;" *ngIf="recipePage.totalResults !== 0">
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
export class UserRecipesComponent {

  @Input() recipePage: RecipePage;

  page = 0;
  size = 3;

  @Input() username: string;

  constructor(private dataService: DataService,
              private toastr: ToastrService) { }

  getUserRecipes(): void {
    this.dataService.getUserRecipes(this.username, this.page, this.size)
    .subscribe({
      next: response => {
        this.recipePage = { ...response };
      },
      error: error => {
        this.toastr.error('Nie udało się pobrać przepisów.', 'Wystąpił problem!', {
          positionClass: 'toast-top-center'
        });
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
