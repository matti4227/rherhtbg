import { Recipe } from './recipe';
export interface RecipePage {
  content: Recipe[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}
