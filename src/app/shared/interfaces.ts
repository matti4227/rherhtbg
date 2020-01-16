export interface UserRegister {
  email: string;
  username: string;
  password: string;
}

export interface UserAuth {
  id: number;
  userName: string;
  bearerToken: string;
  role: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RecipeIngredient {
  id?: number;
  name: string;
  amount: string;
}

export interface Comment {
  id: number;
  comment: string;
  createdDate: Date;
  username: string;
}

export interface Category {
  name: string;
}

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  preparation: string;
  preparationTime: number;
  difficulty: number;
  rating?: number;
  createdDate?: Date;
  username?: string;
  recipeIngredients?: RecipeIngredient[];
  comments?: Comment[];
  picture?: object;
  categories?: Category[];
}

export interface RecipeResolved {
  recipe: Recipe;
  errorMessage?: string;
}

export interface RecipePage {
  content: Recipe[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface Fridge {
  id: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
}
