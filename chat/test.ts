

const { dungHyThan, getFormattedJson } = require('dunghythan');


const Gender = Object.freeze({
    MALE: 1,
    FEMALE: -1
    });
    
    let res = dungHyThan(2003, 11, 5, 12,23, -1);
    res.showAll();
    

    console.log((getFormattedJson(res)));