
## React Native Date Paper

- Uses the native Date.Intl API's which work out of the box on the web / iOS
- Simple API
- Endless scrolling on both web (with react-window) / and VirtualizedList on other platforms
- Performant


## Usage

import from '...'


## Roadmap
- Follow all things in spec (https://material.io/components/date-pickers#mobile-pickers)
- TimePicker component
- Selecting year in single input
- Optional locale overriding (date formatting)
- Optional timezone overriding
- Option to start day of week on monday (or read this from timezone/locale)
- Direct input with modal suffix
- Mobile input picker




### Android Caveats

You will need to add a polyfill for the Intl API on Android if:
- You have Hermes enabled (https://github.com/facebook/hermes/issues/23)
- You have Hermes disabled and you want to support locales outside of en-US and you don't have the org.webkit:android-jsc-intl:+ variant enabled in your app/build.gradle


Install polyfills with Yarn
```
yarn add react-native-localize @formatjs/intl-pluralrules @formatjs/intl-getcanonicallocales @formatjs/intl-listformat @formatjs/intl-displaynames @formatjs/intl-locale
```
or npm
```
npm install react-native-localize @formatjs/intl-pluralrules @formatjs/intl-getcanonicallocales @formatjs/intl-listformat @formatjs/intl-displaynames @formatjs/intl-locale --save
```

`./index.js`
```javascript
// on top of your index.js file
const isAndroid = require('react-native').Platform.OS === 'android'
const isHermesEnabled = !!global.HermesInternal

// in your index.js file
if (isHermesEnabled || isAndroid) {
  require('@formatjs/intl-getcanonicallocales/polyfill')

  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/locale-data/nl.js') // use your language files

  require('@formatjs/intl-relativetimeformat/polyfill')
  require('@formatjs/intl-relativetimeformat/locale-data/nl.js') // use your language files

  require('@formatjs/intl-listformat/polyfill')
  require('@formatjs/intl-listformat/locale-data/nl.js') // use your language files

  require('@formatjs/intl-displaynames/polyfill')
  require('@formatjs/intl-displaynames/locale-data/nl.js') // use your language files

  require('@formatjs/intl-numberformat/polyfill')
  require('@formatjs/intl-numberformat/locale-data/nl.js') // use your language files

  require('@formatjs/intl-datetimeformat/polyfill')
  require('@formatjs/intl-datetimeformat/locale-data/nl.js') // use your language files

  require('@formatjs/intl-datetimeformat/add-all-tz.js')

  require('@formatjs/intl-locale/polyfill')

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  let RNLocalize = require('react-native-localize')
  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone())
  }
}
```