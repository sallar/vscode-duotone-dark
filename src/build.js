'use strict';

const fs = require('fs');
const path = require('path');
const themes = require('./themes');

const xmlTemplate = fs.readFileSync(path.join(__dirname, './theme.xml')).toString('utf8');
const themeList = Object.keys(themes);

themeList.forEach(themeName => {
    const vars = themes[themeName];
    let template = xmlTemplate;

    for (let prop in vars) {
        template = template.replace(new RegExp(`__${prop}__`, 'g'), vars[prop]);
    }
    
    fs.writeFileSync(path.join(__dirname, '../themes/', `${themeName}.tmTheme`), template);
});

console.log('Done writing themes');
