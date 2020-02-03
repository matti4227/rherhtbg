import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categoryText: string;

  categories: Category[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.dataService.getCategories()
    .subscribe({
      next: response => {
        console.log(response);
        this.categories = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  addCategory(): void {
    const category: Category = { name: this.categoryText };

    this.dataService.addCategory(category)
    .subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });

    this.categoryText = null;
    window.location.reload();
  }

  deleteCategory(category: Category): void {
    this.dataService.deleteCategory(category.name)
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
}
