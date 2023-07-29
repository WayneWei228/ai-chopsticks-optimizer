import axios from "axios";
import {Nutrition} from "interfaces/nutrition";
import {Converter} from "../../utils/convert";

class NutritionApiService {
    async getNutritionByIngrediantName(ingrediantName: string) {
        const res = await axios.get(process.env.NUTRITION_API_URL, {
            headers: {
                'X-Api-Key': process.env.NUTRITION_API_KEY
            },
            params: {query: String(ingrediantName)}
        })
        return res.data
    }
}

export {NutritionApiService};