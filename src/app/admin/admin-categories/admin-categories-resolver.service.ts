import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Category } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesResolver implements Resolve<Category[]> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<Category[]> | Promise<Category[]> | Category[] {
    return this.dataService.getCategories();
  }
}
