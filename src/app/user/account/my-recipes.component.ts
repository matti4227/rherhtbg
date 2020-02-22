import { Component, OnInit } from '@angular/core';
import { RecipePage } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-recipes',
  template: `
    <div class="recipes container">

    <div class="card">
      <app-recipe-list [recipePage]="recipePage"></app-recipe-list>

      <div *ngIf="recipePage.totalResults === 0" style="margin: 20px;">
        <legend style="text-align: center;">Nie utworzyłeś żadnego przepisu</legend>
      </div>

      <div class="page-nav" style="margin-top: 20px;" *ngIf="recipePage.totalResults !== 0">
        <app-page-nav
          [page]="recipePage?.currentPage"
          [totalPages]="recipePage?.totalPages"
          (changePage)="changePage($event)">
        </app-page-nav>
      </div>
    </div>

    </div>
  `,
  styles: []
})
export class MyRecipesComponent implements OnInit {

  recipePage: RecipePage;
  page = 0;
  size = 12;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: RecipePage = data['resolvedData'];
      this.onRecipesRetrieved(resolvedData);
    });
  }

  onRecipesRetrieved(recipePage: RecipePage): void {
    this.recipePage = { ...recipePage };
  }

  getOwnRecipes(): void {
    const username = JSON.parse(sessionStorage.getItem('username'));
    this.dataService.getUserRecipes(username, this.page, this.size)
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
    this.getOwnRecipes();
  }

  pageNav(): boolean {
    return typeof this.recipePage === 'undefined' || this.recipePage.totalPages < 2;
  }
}
