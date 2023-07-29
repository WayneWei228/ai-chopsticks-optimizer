import {Ingrediant} from "interfaces/ingrediant";
import {ChatGptService} from "../services/openai/gptService";

class LanguageProcessor {
    ingrediants: Ingrediant[]

    constructor(ingrediants: Ingrediant[]) {
        this.ingrediants = ingrediants;
    }

    private buildGptStr(ingrediant: Ingrediant) {
        return `considering the portion is for 2-people cooking, can you estimate the weight in grams of ${ingrediant.quantity} ${ingrediant.name}, please don't explain, just give me the number`
    }

    getEstimatedWeightByGptResponse(gptResponse: string) {
        try {
            const keyWord = 'grams'
            const substrings = gptResponse.split(keyWord)
            const words = substrings.slice(0, -1).join(keyWord).trim().split(" ")
            return parseInt(words[words.length - 1])
        } catch (err) {
            console.log(err)
            return 0
        }
    }

    cacheEstimatedWeightToCloudDB(estimatedWeight: number) {

    }

    async process() {
        for (let ingrediant of this.ingrediants) {
            const gptStr = this.buildGptStr(ingrediant)
            const chatGptClient = new ChatGptService();
            const gptResponse = await chatGptClient.makeGptCall(gptStr)
            const estimatedWeight = this.getEstimatedWeightByGptResponse(gptResponse)
            this.cacheEstimatedWeightToCloudDB(estimatedWeight)
        }
    }
}

export {LanguageProcessor};