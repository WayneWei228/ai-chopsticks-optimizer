import {Ingrediant} from "interfaces/ingrediant";
import {Nutrition} from "../interfaces/nutrition";

class Converter {
    public toIngrediants(list: [any]): Ingrediant[] {
        let ingrediantList: Ingrediant[] = []
        for (let ingrediant of list) {
            ingrediantList.push({
                name: ingrediant['ingrediantName'],
                nameEN: ingrediant['ingrediantNameEN'],
                quantity: ingrediant['quantity']
            });
        }
        return ingrediantList;
    }

    public toNutrition(obj: any): Nutrition {
        let nutrition: Nutrition
        nutrition = {
            name: obj.name,
            calories: obj.calories,
            serving_size_g: obj.serving_size_g,
            fat_total_g: obj.fat_total_g,
            fat_saturated_g: obj.fat_saturated_g,
            protein_g: obj.protein_g,
            sodium_mg: obj.sodium_mg,
            potassium_mg: obj.potassium_mg,
            cholesterol_mg: obj.cholesterol_mg,
            carbohydrates_total_g: obj.carbohydrates_total_g,
            fiber_g: obj.fiber_g,
            sugar_g: obj.sugar_g,
        }
        return nutrition;
    }
}

export {Converter}