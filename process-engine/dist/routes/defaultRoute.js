import { Router } from 'express';
import { ChatGptService } from '../services/openai/gptService';
import { Converter } from '../utils/convert';
import { LanguageProcessor } from '../languageProcessor/languageProcessor';
import { NutritionApiService } from '../services/apiNinja/nutritionApiService';
import log4js from "log4js";
export const defaultRoute = Router();
const logger = log4js.getLogger();
defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
defaultRoute.post('/chat', async (req, res) => {
    let msg = req.body.message;
    const chatGptService = new ChatGptService();
    const gptResponse = await chatGptService.makeGptCall(msg);
    res.send(gptResponse);
});
defaultRoute.post('/analyze', async (req, res) => {
    let msg = req.body;
    const converter = new Converter();
    let ingredentsList = converter.toIngrediants(msg);
    for (let ingrediant of ingredentsList) {
        const nutritionApiService = new NutritionApiService();
        const nutrition = await nutritionApiService.getNutritionByIngrediantName(ingrediant.nameEN);
        const converter = new Converter();
        if (nutrition.length > 0) {
            ingrediant.nutrition = converter.toNutrition(nutrition[0]);
        }
        else {
            logger.debug("Can't find ingrediant nutrition: %s, english name %s", ingrediant.name, ingrediant.nameEN);
        }
    }
    console.log(ingredentsList);
    const languageProcessor = new LanguageProcessor(ingredentsList);
    res.send(ingredentsList);
});
