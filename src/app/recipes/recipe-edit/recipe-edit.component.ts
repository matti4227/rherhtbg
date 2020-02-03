import { Category } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe, RecipeResolved, RecipeIngredient } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  name: string;
  description: string;
  preparation: string;
  preparationTime: string;
  difficulty: string;

  difficulties = ['łatwe', 'średnie', 'trudne'];
  prepTimes = ['do 30 min', '30 do 60 min', 'powyżej 60 min'];

  categories = [];
  selectedCategories: Category[] = [];
  selectedCategory: string;

  arrayIngredients = [];
  selectedIngredients: RecipeIngredient[] = [];
  selectedIngredient: string;
  selectedAmount: string;
  selectedType: string;
  ingredients: RecipeIngredient[] = [];

  amountTypes = [
    'szt',
    'g',
    'ml'
  ];

  get isDirty(): boolean {
    return JSON.stringify(this.originalRecipe) !== JSON.stringify(this.currentRecipe);
  }

  currentRecipe: Recipe;
  originalRecipe: Recipe;

  get recipe(): Recipe {
    return this.currentRecipe;
  }
  set recipe(value: Recipe) {
    this.currentRecipe = {
      ...value,
      difficulty: this.getDifficultyName(value.difficulty),
      preparationTime: this.getPrepTimeName(value.preparationTime)
    };
    // Clone the object to retain a copy
    this.originalRecipe = {
      ...value,
      difficulty: this.getDifficultyName(value.difficulty),
      preparationTime: this.getPrepTimeName(value.preparationTime)
    };
  }

  imageURL: any;
  selectedFile: any;

  base64Data: any;

  pageTitle: string;
  errorMessage: string;

  ingCatFlag = false;

  filteredCategoryOptions: Observable<string[]>;
  myCategoryControl = new FormControl();
  private _cfilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().includes(filterValue));
  }

  filteredIngredientOptions: Observable<string[]>;
  myIngredientControl = new FormControl();
  private _ifilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.arrayIngredients.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: RecipeResolved = data['resolvedData'];
      this.errorMessage = resolvedData.errorMessage;
      this.onRecipeRetrieved(resolvedData.recipe);
    });

    this.dataService.getCategories()
      .subscribe({
        next: response => {
          console.log(response);
          for (let category of response) {
            this.categories.push(category.name);
          }
        },
        error: error => {
          console.error(error);
        }
      });

    this.dataService.getIngredients()
      .subscribe({
        next: response => {
          console.log(response);
          for (let ingredient of response) {
            this.arrayIngredients.push(ingredient.name);
          }
          this.startFiltering();
        },
        error: error => {
          console.error(error);
        }
      });
  }

  onRecipeRetrieved(recipe: Recipe): void {
    recipe.avatar = null;
    this.recipe = recipe;

    if (!this.recipe) {
      this.pageTitle = 'Nie znaleziono przepisu';
    } else {
      if (this.recipe.id === 0) {
        this.pageTitle = 'Dodaj nowy przepis';
      } else {
        this.pageTitle = `Edytuj przepis: ${this.recipe.name}`;
      }
    }
  }

  getDifficultyName(difficulty: number): string {
    if (difficulty === 1) {
      return 'łatwe';
    } else if (difficulty === 2) {
      return 'średnie';
    } else if (difficulty === 3) {
      return 'trudne';
    }
  }

  getDifficultyNumber(difficulty: string): number {
    if (difficulty === 'łatwe') {
      return 1;
    } else if (difficulty === 'średnie') {
      return 2;
    } else if (difficulty === 'trudne') {
      return 3;
    }
  }

  getPrepTimeName(prepTime: number): string {
    if (prepTime === 1) {
      return 'do 30 min';
    } else if (prepTime === 2) {
      return '30 do 60 min';
    } else if (prepTime === 3) {
      return 'powyżej 60 min';
    }
  }

  getPrepTimeNumber(prepTime: string): number {
    if (prepTime === 'do 30 min') {
      return 1;
    } else if (prepTime === '30 do 60 min') {
      return 2;
    } else if (prepTime === 'powyżej 60 min') {
      return 3;
    }
  }

  saveRecipe(): void {
    // if (this.recipeForm.valid) {
      const recipe: Recipe = {
        ...this.recipe,
        difficulty: this.getDifficultyNumber(this.recipe.difficulty),
        preparationTime: this.getPrepTimeNumber(this.recipe.preparationTime),
        picture: null
       };
       console.log(this.getPrepTimeNumber(this.recipe.preparationTime))
       console.log(recipe)

      if (this.recipe.id === 0) {
        this.dataService.createRecipe(recipe)
          .subscribe({
            next: response => {
              console.log(response);
              const id = response.id;
              this.updateImage(id);
              this.onSaveComplete();
            },
            error: error => {
              console.error(error);
            }
          });
      } else {
        this.dataService.updateRecipe(this.recipe.id, recipe)
          .subscribe({
            next: response => {
              console.log(response);
              const id = response.id;
              this.updateImage(id);
              this.onSaveComplete();
            },
            error: error => {
              console.error(error);
            }
          });
      }
    // }
  }

  updateImage(id: number): void {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
      this.dataService.updateRecipeImage(id, uploadData)
        .subscribe({
          next: response => {
            console.log(response);
          },
          error: error => {
            console.error(error);
          }
        });
    }
  }

  onSaveComplete(): void {
    this.currentRecipe = null;
    this.originalRecipe = null;
    this.ingCatFlag = false;
    this.router.navigate(['/recipes']);
  }

  addCategory(): void {
    if (this.categoryValid()) {
      if (this.categoryAlreadyInRecipe()) {
        this.recipe.categories.push({ name: this.selectedCategory });
        this.selectedCategory = '';
        this.ingCatFlag = true;
      } else {
        console.log('kategoria jest już wybrana');
      }
    } else {
      console.log('nie ma takiej kategorii');
    }
  }

  removeCategory(i: number): void {
    this.recipe.categories.splice(i, 1);
    this.ingCatFlag = true;
  }

  categoryValid(): boolean {
    let flag = false;
    for (let i of this.categories) {
      if (this.selectedCategory === i) {

        flag = true;
      }
    }
    return flag;
  }

  categoryAlreadyInRecipe(): boolean {
    let flag = true;
    for (let i of this.recipe.categories) {
      if (this.selectedCategory === i.name) {
        flag = false;
      }
    }
    return flag;
  }

  addIngredient(): void {
    if (this.ingredientValid()) {
      if (this.ingredientAlreadyInRecipe()) {
        this.recipe.recipeIngredients.push({ name: this.selectedIngredient, amount: `${this.selectedAmount} ${this.selectedType}` });
        this.selectedIngredient = '';
        this.selectedType = '';
        this.selectedAmount = '';
        this.ingCatFlag = true;
      } else {
        console.log('składnik jest już w lodówce');
      }
    } else {
      console.log('nie ma takiego składnika w bazie');
    }
  }

  removeSelectedIngredient(index: number): void {
    this.recipe.recipeIngredients.splice(index, 1);
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

  ingredientAlreadyInRecipe(): boolean {
    let flag = true;
    for (let i of this.recipe.recipeIngredients) {
      if (this.selectedIngredient === i.name) {
        flag = false;
      }
    }
    return flag;
  }

  selectPicture(event: any): void {
    // const file = (event.target as HTMLInputElement).files[0];
    this.selectedFile = event.target.files[0];
    // this.recipeForm.patchValue({
    //   picture: this.selectedFile
    // });
    // this.recipeForm.get('picture').updateValueAndValidity();
    this.showPreview(this.selectedFile);
  }

  showPreview(file: any): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.recipe.picture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  deleteRecipe(): void {
    this.dataService.deleteRecipe(this.recipe.id)
      .subscribe({
        next: response => {
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error: error => {
          console.error(error);
        }
      });
  }

  private startFiltering(): void {
    this.filteredCategoryOptions = this.myCategoryControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._cfilter(value))
    );
    this.filteredIngredientOptions = this.myIngredientControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._ifilter(value))
    );
  }
}
