var fs = require('fs');
var _ = require('lodash');
var getTz = require('get-tz');
var worldCountries = require('world-countries');
const dataPath = './dist';

function getNativeNames(native) {
    let names = [];
    for (let lang of Object.keys(native)) {
        if (_.has(native[lang], "common")) {
            names.push(native[lang]["common"]);
        }
        if (_.has(native[lang], "official")) {
            names.push(native[lang]["official"]);
        }
    }

    return names;
}

function getCountryName(cca2) {
    let c = worldCountries.find(country => {
        return country["cca2"] == cca2;
    });

    if (c !== undefined && _.has(c, "name.official")) {
        return c["name"]["official"];
    }

    return cca2;
}

function getCountryKeywords(cca2) {
    let c = worldCountries.find(country => {
        return country["cca2"] == cca2;
    });

    let keywords = [cca2];
    keywords.push(getCountryName(cca2));

    if (_.has(c, 'name.common')) {
        keywords.push(c["name"]["common"]);
    }
    if (_.has(c, 'name.official')) {
        keywords.push(c["name"]["official"]);
    }
    if (_.has(c, 'name.native')) {
        keywords.push(getNativeNames(c["name"]["native"]));
    }

    return _.uniq(_.union(keywords).join(" ").split(/[\s,]+/)).join(" ");
}

getTz().then(rows => {
    fs.writeFileSync(`${dataPath}/timezones-iana.json`, JSON.stringify(rows, null, 2), 'utf8');

    let countryZones = [];
    let keywordZones = [];

    for (let row of rows) {

        countryZones.push({
            name: row.id,
            countryCode: row.countryCode,
            countryName: getCountryName(row.countryCode)
        });

        keywordZones.push({
            value: row.id,
            label: row.id, //TODO: translate to local timezone names and fork files
            keywords: getCountryKeywords(row.countryCode)
        });

    }
    fs.writeFileSync(`${dataPath}/timezones-countries.json`, JSON.stringify(countryZones, null, 2), 'utf8');
    fs.writeFileSync(`${dataPath}/timezones-keywords.json`, JSON.stringify(keywordZones, null, 2), 'utf8');

});




