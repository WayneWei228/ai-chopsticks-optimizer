import axios from "axios";
class NutritionApiService {
    async getNutritionByIngrediantName(ingrediantName) {
        const res = await axios.get(process.env.NUTRITION_API_URL, {
            headers: {
                'X-Api-Key': process.env.NUTRITION_API_KEY
            },
            params: { query: String(ingrediantName) }
        });
        return res.data;
    }
}
export { NutritionApiService };
