"use strict";
const translate = require('translation-google');
const translateStr = (str) => {
    translate(str, { to: 'en' })
        .then((res) => {
        return res.text;
    })
        .catch((err) => {
        ƒ;
        console.error(err);
    });
};
module.exports = {
    translateStr
};
