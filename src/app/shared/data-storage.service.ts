import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService) {}

  stroreRecipes() {
    return this.http.put('https://recipe-book-ng5-jack.firebaseio.com/recipe.json',
      this.recipeService.getRecipes());
  }
  getRecipes() {
    return this.http.get('https://recipe-book-ng5-jack.firebaseio.com/recipe.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[])=> {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
