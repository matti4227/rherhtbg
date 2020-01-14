import { Ingredient } from './ingredient';
import { Component, OnInit } from '@angular/core';
import { FridgeService } from './fridge.service';
import { Fridge } from './fridge';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {

  fridge: Fridge;
  ingredients: Ingredient[];
  selectedIngredients: string[];

  constructor(private fridgeService: FridgeService) { }

  selectedIngredient: string;
  myControl = new FormControl();
  arrayIngredients = [
    'Arbuz',
    'Ananas',
    'Winogrono',
    'Mandarynka'
  ];

  filteredOptions: Observable<string[]>;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrayIngredients.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.fridgeService.getFridge()
      .subscribe({
        next: response => {
          this.fridge = response;
          this.ingredients = this.fridge.ingredients;
          console.log(this.ingredients);
        },
        error: error => {
          console.log(error);
        }
      });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getData(): Ingredient[] {
    if (this.ingredientsSelectedDisabled()) {
      return this.getSelectedIngredients();
    } else {
      return [];
    }
  }

  saveFridge(): void {
    this.fridgeService.updateFridge(this.ingredients)
    .subscribe({
      next: response => {
        this.fridge = response;
        this.ingredients = this.fridge.ingredients;
        console.log(this.ingredients);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  addIngredientToFridge(): void {
    if (this.ingredientValid()) {
      if (this.ingredientAlreadyInFridge()) {
        this.ingredients.push({ name: this.selectedIngredient });
      } else {
        console.log('składnik jest już w lodówce');
      }
    } else {
      console.log('nie ma takiego składnika w bazie');
    }
  }

  ingredientValid(): boolean {
    let flag = false;
    for (let i of this.arrayIngredients) {
      if (this.selectedIngredient === i) {

        flag = true;
      }
    }
    return flag;
  }

  ingredientAlreadyInFridge(): boolean {
    let flag = true;
    for (let i of this.ingredients) {
      if (this.selectedIngredient === i.name) {
        flag = false;
      }
    }
    return flag;
  }

  selectedIngredientDisabled(): boolean {
    return typeof this.selectedIngredient === 'undefined' || this.selectedIngredient === '';
  }

  ingredientsSelectedDisabled(): boolean {
    return typeof this.selectedIngredients === 'undefined' || this.selectedIngredients.length === 0;
  }

  ingredientsDisabled(): boolean {
    return typeof this.ingredients === 'undefined' || this.ingredients.length === 0;
  }

  removeSelected(): void {
    let ingToRemove = [];
    for (let ing = this.ingredients.length - 1; ing >= 0 ; ing--) {
      for (let selIng = this.selectedIngredients.length - 1; selIng >= 0 ; selIng--) {
        if (this.ingredients[ing].name === this.selectedIngredients[selIng]) {
          ingToRemove.push(ing);
        }
      }
    }
    for (let i of ingToRemove) {
      this.ingredients.splice(i, 1);
      console.log(this.ingredients);
    }
  }

  getSelectedIngredients(): Ingredient[] {
    let ingredients: Ingredient[] = [];
    for (let ing of this.selectedIngredients) {
      ingredients.push({ name: ing });
    }
    return ingredients;
  }

}
