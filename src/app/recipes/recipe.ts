export interface Recipe {
  userId?: number;
  name: string;
  description: string;
  preparation: string;
  preparationTime: number;
  difficulty: number;
  rating?: number;
  ingredients?: object[];
  picture?: object;
}
