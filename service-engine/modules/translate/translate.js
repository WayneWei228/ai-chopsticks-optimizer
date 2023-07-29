const translatte = require('translatte');

const translateStr = async (str) => {
    try {
        console.log(str)
        const res = await translatte(str, {to: 'en'});
        console.log(res.text)
        return res.text;
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    translateStr
}