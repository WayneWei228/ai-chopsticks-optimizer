const express = require('express');
const router = express.Router();
const {getIngrediantsMap} = require('../modules/scraping/scraping.js')
const axios = require("axios")
const {translateStr} = require('../modules/translate/translate.js')
const {getFirestoreDB} = require("../modules/firebase/admin");

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

const getCloudTranslationCache = async (db) => {
    console.log(`getting from cloud cache`)
    let cloudTranslatesMap = {}
    const translatesRef = db.collection('translates')
    const snapshot = await translatesRef.get();
    snapshot.forEach(doc => {
        cloudTranslatesMap[doc.id] = doc.data().nameEn
    });
    return cloudTranslatesMap
}

const getCloudTranslationCacheByMap = async (db) => {
    console.log(`getting from cloud cache combined_map`)
    const translatesRef = db.collection('translates').doc('combined_map')
    const doc = await translatesRef.get()
    if (!doc.exists) {
        console.log('No such document!')
    } else {
        return doc.data()
    }
}

const setCloudTranslationCache = async (db, map, arr) => {
    // not using map as update using batch iteration
    if (arr.length > 0) {
        console.log(`New translates found, pushing to cloud:`)
        console.log(arr)
        const batch = db.batch()
        for (let translate of arr) {
            const nycRef = db.collection('translates').doc(translate.name);
            batch.set(nycRef, {
                name: translate.name,
                nameEn: translate.nameEn
            });
        }
        await batch.commit();
    } else {
        console.log(`Using cloud cache`)
    }
}

const setCloudTranslationCacheByMap = async (db, map, arr) => {
    if (arr.length > 0) {
        console.log(`New translates found, pushing to cloud:`)
        console.log(arr)
        for (let translate of arr) {
            map[translate.name] = translate.nameEn
            const docRef = db.collection('translates').doc('combined_map');
            await docRef.set(map);
        }
    } else {
        console.log(`Nothing to update`)
    }
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
    const db = getFirestoreDB()
    let missList = []
//    let cacheMap = await getCloudTranslationCache(db)
    let cacheMap = await getCloudTranslationCacheByMap(db)
    for (const [index, [ingrediantName, ingrediantQuantity]] of Object.entries(Object.entries(rawIngrediantsMap))) {
        let ingrediantNamesEn = ''
        if (cacheMap.hasOwnProperty(ingrediantName)) {
            ingrediantNamesEn = cacheMap[ingrediantName]
        } else {
            ingrediantNamesEn = await translateStr(ingrediantName)
            missList.push({
                name: ingrediantName,
                nameEn: ingrediantNamesEn
            })
        }
        ingrediantsMap.push({
            'ingrediantName': ingrediantName,
            'ingrediantNameEN': ingrediantNamesEn,
            'quantity': ingrediantQuantity
        })
    }
//    await setCloudTranslationCache(db, cacheMap, missList)
    await setCloudTranslationCacheByMap(db, cacheMap, missList)
    console.log(ingrediantsMap)
//    await forwardToProcessEngine(ingrediantsMap)
    res.status(200).json(ingrediantsMap)

})

module.exports = router;