const express = require('express');
const router = express.Router();
const {getIngrediantsMap} = require('../modules/scraping/scraping.js')
const axios = require("axios")
const {translateStr} = require('../modules/translate/translate.js')

const forwardToProcessEngine = async (ingrediantsMap) => {
    console.log(`Forwarding request to process engine... ${process.env.PROCESS_ENGINE_URL}`)
    const headers = {
        'Content-Type': 'application/json',
    }
    try {
        return await axios.post(process.env.PROCESS_ENGINE_URL, ingrediantsMap, {headers: headers})
    } catch (error) {
        return 0
    }
};

const buildOneSearchString = (obj) => {
    const delimiter = ','
    let out = ''
    let arr = Object.keys(obj).entries()
    for (let [i, value] of arr) {
        if (i === arr.length - 1) {
            out = out + value
        } else {
            out = out + value + delimiter
        }
    }
    return out
}

router.post('/getIngrediants', async (req, res) => {
    const data = req.body
    console.log(data.url)
    if (!data.url) {
        res.status(400).json({
            'err': 'no valid request body, please specify field `url`'
        })
        return 0
    }
    const rawIngrediantsMap = await getIngrediantsMap(data.url)
    let ingrediantsMap = []
//    let oneSearchString = buildOneSearchString(rawIngrediantsMap)
//    let ingrediantNamesEn = await translateStr(oneSearchString)
//    ingrediantNamesEn = ingrediantNamesEn.split(', ')
    for (const [index, [ingrediantName, ingrediantQuantity]] of Object.entries(Object.entries(rawIngrediantsMap))) {
        let ingrediantNamesEn = await translateStr(ingrediantName)
        ingrediantsMap.push({
            'ingrediantName': ingrediantName,
            'ingrediantNameEN': ingrediantNamesEn,
            'quantity': ingrediantQuantity
        })
    }
    console.log(ingrediantsMap)
    await forwardToProcessEngine(ingrediantsMap)
    res.status(200).json(ingrediantsMap)

})

module.exports = router;