'use strict';
const fs = require('fs-extra');
const path = require('path');
const themes = require('./themes');

let xmlTemplate = fs.readFileSync(path.join(__dirname, './theme.xml'));

if (!xmlTemplate) {
    throw new Error('Template does not exist');
}

xmlTemplate = xmlTemplate.toString('utf8');
const themeList = Object.keys(themes);

themeList.forEach(themeName => {
    const vars = themes[themeName];
    let template = xmlTemplate.slice(0);

    for (let prop in vars) {
        template = template.replace(new RegExp(`__${prop}__`, 'g'), vars[prop]);
    }
    
    fs.outputFileSync(path.join(__dirname, '../themes/', `${themeName}.tmTheme`), template);
});

console.log('Done writing themes');
