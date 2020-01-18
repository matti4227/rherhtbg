import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { RecipePage } from '../shared/interfaces';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent implements OnInit {

  recipePage: RecipePage;
  page = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getCookbook();
  }

  getCookbook(): void {
    this.dataService.getCookbook(this.page)
      .subscribe({
        next: response => {
          this.recipePage = { ...response };
          console.log(response);
        },
        error: error => {
          console.error(error);
        }
      });
  }

  changePage(page: number): void {
    this.page = page;
    this.getCookbook();
  }

  pageNav(): boolean {
    return typeof this.recipePage === 'undefined' || this.recipePage.totalPages < 2;
  }
}
