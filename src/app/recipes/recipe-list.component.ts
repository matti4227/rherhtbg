import { Component, Input } from '@angular/core';
import { RecipePage } from '../shared/interfaces';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  @Input() recipePage: RecipePage;

}
