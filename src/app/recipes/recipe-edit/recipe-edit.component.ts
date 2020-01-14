import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from '../recipe';
import { RecipesService } from '../recipes.service';
import { NumberValidators } from '../../shared/number-validator';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;

  imageURL: string;
  pageTitle: string;

  constructor(private formBuilder: FormBuilder,
              private recipesService: RecipesService,
              private router: Router) { }

  ngOnInit() {
    this.recipe = null;
    this.pageTitle = 'Dodaj nowy przepis';

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
      picture: ['', [
        // Validators.required,
        // required file type
      ]]
    });
  }

  saveRecipe(): void {
    if (this.recipeForm.valid) {
      const recipe = { ...this.setTemporary, ...this.recipeForm.value };

      this.recipesService.createRecipe(recipe)
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
  }

  get setTemporary(): Recipe {
    return {
      userId: 1,
      name: null,
      description: null,
      preparation: null,
      preparationTime: null,
      difficulty: null,
      ingredients: [],
      picture: null
    };
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
