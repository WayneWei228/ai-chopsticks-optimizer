const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping(url) {
    return await axios.request({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
}

const getIngrediantsMap = async (url) => {
    let axiosResponse = await performScraping(url)
    const $ = cheerio.load(axiosResponse.data)
    const ingrediantsRef = $(".ings").find('table').find('tbody').children('tr');

    let name, quantity, ingrediantsMap = {}
    for (let ingrediantRef of ingrediantsRef) {
        name = $(ingrediantRef).find('.name').text().trim();
        quantity = $(ingrediantRef).find('.unit').text().trim();

        ingrediantsMap[name] = quantity
    }
    return ingrediantsMap
}

module.exports = {
    getIngrediantsMap
}