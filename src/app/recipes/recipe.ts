import { Comment } from './comment';
import { RecipeIngredient } from './recipe-ingredient';
export interface Recipe {
  id: number;
  name: string;
  description: string;
  preparation: string;
  preparationTime: number;
  difficulty: number;
  rating?: number;
  recipeIngredients?: RecipeIngredient[];
  comments?: Comment[];
  picture?: object;
}
