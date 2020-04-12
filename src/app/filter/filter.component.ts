import { Component, OnInit } from '@angular/core';
import { FilterData } from './filter-data';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  categories = ['wszystkie'];
  difficulties = ['wszystkie', 'łatwe', 'średnie', 'trudne'];
  prepTimes = ['wszystkie', 'do 30 min', '30 do 60 min', 'powyżej 60 min'];
  sorts = ['najnowsze', 'najstarsze', 'najwyżej oceniane'];

  filterData: FilterData;
  category = 'wszystkie';
  difficulty = 'wszystkie';
  prepTime = 'wszystkie';
  sort = 'najnowsze';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCategories()
      .subscribe({
        next: response => {
          for (let category of response) {
            this.categories.push(category.name);
          }
        }
      });
  }

  getData(): FilterData {
    this.filterData = new FilterData();
    this.setFilterData();
    return this.filterData;
  }

  setFilterData(): void {
    this.setCategory();
    this.setDifficulty();
    this.setPrepTime();
    this.setSort();
  }

  private setCategory(): void {
    if (this.category === 'wszystkie' || typeof this.category === 'undefined') {
      this.filterData.category = '';
    } else {
      this.filterData.category = this.category;
    }
  }

  private setDifficulty(): void {
    if (this.difficulty === this.difficulties[0] || typeof this.difficulty === 'undefined') {
      this.filterData.difficulty = 0;
    }
    if (this.difficulty === this.difficulties[1]) {
      this.filterData.difficulty = 1;
    }
    if (this.difficulty === this.difficulties[2]) {
      this.filterData.difficulty = 2;
    }
    if (this.difficulty === this.difficulties[3]) {
      this.filterData.difficulty = 3;
    }
  }

  private setPrepTime(): void {
    if (this.prepTime === this.prepTimes[0] || typeof this.prepTime === 'undefined') {
      this.filterData.prepTime = 0;
    }
    if (this.prepTime === this.prepTimes[1]) {
      this.filterData.prepTime = 1;
    }
    if (this.prepTime === this.prepTimes[2]) {
      this.filterData.prepTime = 2;
    }
    if (this.prepTime === this.prepTimes[3]) {
      this.filterData.prepTime = 3;
    }
  }

  private setSort(): void {
    if (this.sort === this.sorts[0] || typeof this.sort === 'undefined') {
      this.filterData.sort = 2;
    }
    if (this.sort === this.sorts[1]) {
      this.filterData.sort = 1;
    }
    if (this.sort === this.sorts[2]) {
      this.filterData.sort = 4;
    }
  }
}
