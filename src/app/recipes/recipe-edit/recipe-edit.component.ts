import { Category } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NumberValidators } from '../../shared/number-validator';
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

  difficulties = ['wszystkie', 'łatwe', 'średnie', 'trudne'];
  prepTimes = ['wszystkie', 'do 30 min', '30 do 60 min', 'powyżej 60 min'];

  categories = [
      'polska',
      'azjatycka',
      'indyjska'
  ];
  selectedCategories: Category[] = [];
  selectedCategory: string;

  arrayIngredients = [
    'Arbuz',
    'Ananas',
    'Winogrono',
    'Mandarynka'
  ];
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

  recipe: Recipe;
  recipeForm: FormGroup;

  imageURL: string;
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

  get isDirty(): boolean {
    return this.recipeForm.dirty || this.ingCatFlag;
  }

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.route.data.subscribe(data => {
      const resolvedData: RecipeResolved = data['resolvedData'];
      this.errorMessage = resolvedData.errorMessage;
      this.onRecipeRetrieved(resolvedData.recipe);
    });
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

  private buildForm(): void {
    this.recipeForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(1000)
      ]],
      preparation: ['', [
        Validators.required,
        Validators.maxLength(50000)
      ]],
      preparationTime: ['', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,*})?$')
      ]],
      difficulty: ['', [
        Validators.required,
        NumberValidators.range(1, 5),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,*})?$')
      ]],
      // picture: ['', [
      //   // Validators.required,
      //   // required file type
      // ]]
    });
  }

  onRecipeRetrieved(recipe: Recipe): void {
    this.recipe = recipe;
    this.recipeForm.patchValue({
      name: this.recipe.name,
      description: this.recipe.description,
      preparation: this.recipe.preparation,
      preparationTime: this.recipe.preparationTime,
      difficulty: this.recipe.difficulty
    });

    this.selectedCategories = this.recipe.categories;
    this.selectedIngredients = this.recipe.recipeIngredients;

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

  saveRecipe(): void {
    if (this.recipeForm.valid) {
      // console.log(this.ingredients)
      // // console.log(this.setTemporary)
      // console.log(this.recipeForm.value)
      const recipe: Recipe = { ...this.recipeForm.value, };
      recipe.categories = this.selectedCategories;
      recipe.recipeIngredients = this.selectedIngredients;
      console.log(this.selectedCategories)
      console.log(this.selectedIngredients)
      console.log(recipe.recipeIngredients)
      // console.log(recipe.categories)
      // console.log(recipe)
      // console.log(this.recipe.id)
      if (this.recipe.id === 0) {
        this.dataService.createRecipe(recipe)
          .subscribe({
            next: response => {
              console.log(response);
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
              this.onSaveComplete();
            },
            error: error => {
              console.error(error);
            }
          })
      }
    }
  }

  onSaveComplete(): void {
    this.recipeForm.reset();
    this.ingCatFlag = false;
    this.router.navigate(['/recipes']);
  }

  // get setTemporary(): Recipe {
  //   return {
  //     name: null,
  //     description: null,
  //     preparation: null,
  //     preparationTime: null,
  //     difficulty: null,
  //     // ingredients: [],
  //     // picture: null
  //   };
  // }

  addCategory(): void {
    if (this.categoryValid()) {
      if (this.categoryAlreadyInRecipe()) {
        this.selectedCategories.push({ name: this.selectedCategory });
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
    this.selectedCategories.splice(i, 1);
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
    for (let i of this.selectedCategories) {
      if (this.selectedCategory === i.name) {
        flag = false;
      }
    }
    return flag;
  }

  addIngredient(): void {
    if (this.ingredientValid()) {
      if (this.ingredientAlreadyInFridge()) {
        this.selectedIngredients.push({ name: this.selectedIngredient, amount: `${this.selectedAmount} ${this.selectedType}` });
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

  removeSelected(index: number): void {
    this.selectedIngredients.splice(index, 1);
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
    for (let i of this.selectedIngredients) {
      if (this.selectedIngredient === i.name) {
        flag = false;
      }
    }
    return flag;
  }

  patchFormWithPicture(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];

    this.recipeForm.patchValue({
      picture: file
    });

    this.recipeForm.get('picture').updateValueAndValidity();
    this.showPreview(file);
  }

  showPreview(file: any): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

}
