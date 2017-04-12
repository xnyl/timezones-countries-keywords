# timezones-countries-keywords
JSON feed with timezones and additional country infos. Useful for timezone selectors. Based on IANA's data and world-countries package.


## Installation

```shell
npm install timezones-countries-keywords --save
```

## Usage

```js
var feed = require("timezones-countries-keywords");

var withKeywords = feed.timezonesKeywords;
/*
[
  {
    "value": "Europe/Andorra",
    "label": "Europe/Andorra",
    "keywords": "AD Principality of Andorra Principat d'Andorra"
  },
  {
    "value": "Asia/Dubai",
    "label": "Asia/Dubai",
    "keywords": "AE United Arab Emirates دولة الإمارات العربية المتحدة"
  },
  ...
]
*/

var withIanaData = feed.timezonesIana;
/*
[
  {
    "countryCode": "AD",
    "coordinate": {
      "latitude": {
        "sign": "+",
        "degree": 42,
        "minute": 30
      },
      "longitude": {
        "sign": "+",
        "degree": 1,
        "minute": 31
      }
    },
    "id": "Europe/Andorra"
  },
  {
    "countryCode": "AE",
    "coordinate": {
      "latitude": {
        "sign": "+",
        "degree": 25,
        "minute": 18
      },
      "longitude": {
        "sign": "+",
        "degree": 55,
        "minute": 18
      }
    },
    "id": "Asia/Dubai"
  },
  ...
]
*/

var withCountries = feed.timezonesCountries;
/*
[
  {
    "name": "Europe/Andorra",
    "countryCode": "AD",
    "countryName": "Principality of Andorra"
  },
  {
    "name": "Asia/Dubai",
    "countryCode": "AE",
    "countryName": "United Arab Emirates"
  },
  ...
]

*/

```