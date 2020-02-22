import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Fridge, Ingredient } from '../shared/interfaces';
import { DataService } from '../core/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {

  fridge: Fridge;
  ingredients: Ingredient[];
  selectedIngredients: string[];
  selectedIngredient: string;
  myControl = new FormControl();
  arrayIngredients = [];

  fridgeChanged = false;

  constructor(private dataService: DataService,
              private toastr: ToastrService) { }

  filteredOptions: Observable<string[]>;
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrayIngredients.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.dataService.getFridge()
      .subscribe({
        next: response => {
          this.fridge = response;
          this.ingredients = this.fridge.ingredients;
        },
        error: error => {
          this.toastr.error('Wystąpił problem!', 'Nie udało się pobrać lodówki!', {
            positionClass: 'toast-top-center'
          });
        }
      });

    this.dataService.getIngredients()
      .subscribe({
        next: response => {
          for (let ingredient of response) {
            this.arrayIngredients.push(ingredient.name);
          }
          this.startFiltering();
        }
      });
  }

  getData(): Ingredient[] {
    if (!this.ingredientsSelectedDisabled()) {
      return this.getSelectedIngredients();
    } else {
      return [];
    }
  }

  saveFridge(): void {
    this.dataService.updateFridge(this.ingredients)
    .subscribe({
      next: response => {
        this.fridge = response;
        this.ingredients = this.fridge.ingredients;
        this.fridgeChanged = false;
        this.toastr.success('Pomyślnie zapisano lodówkę.', 'Sukces!', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error: error => {
        this.toastr.error('Nie udało się zapisać lodówki.', 'Wystąpił problem!', {
          positionClass: 'toast-top-center'
        });
      }
    });
  }

  addIngredientToFridge(): void {
    if (this.ingredientValid()) {
      if (this.ingredientAlreadyInFridge()) {
        this.ingredients.push({ name: this.selectedIngredient });
        this.selectedIngredient = '';
        this.fridgeChanged = true;
      } else {
        this.selectedIngredient = '';
        this.toastr.error('Składnik jest już w lodówce.', '', {
          timeOut: 2000
        });
      }
    } else {
      this.selectedIngredient = '';
      this.toastr.error('Nie ma takiego składnika w bazie.', '', {
        timeOut: 2000
      });
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
    return typeof this.ingredients === 'undefined' || this.ingredients.length === 0 || this.fridgeChanged === false;
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
    }
    this.fridgeChanged = true;
  }

  getSelectedIngredients(): Ingredient[] {
    let ingredients: Ingredient[] = [];
    for (let ing of this.selectedIngredients) {
      ingredients.push({ name: ing });
    }
    return ingredients;
  }

  showFridgeInfo(): void {
    this.toastr.info(
      `Aby wyszukać przepisy po składnikach dodaj je do swojej lodówki, a następnie zaznacz.
      Zapisz swoją lodówkę, aby trzymać w niej swoje ulubione składniki na kolejny raz!`, '', {
        timeOut: 10000,
        extendedTimeOut: 3000,
        positionClass: 'toast-bottom-right',
        closeButton: true,
        progressBar: true
      });
  }

  private startFiltering(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
}
