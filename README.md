# search-mdn
 Search Mozilla's Developer Network using the official API!

 That's right: no scraping or bulky dependencies needed. Only 1 http request is made, results have no need to be parsed by this package, meaning that the results will never differ unless MDN's API is changed.

# Examples
```js
import { fetchMDN } from 'search-mdn';

// Search for "fetch", locale defaults to 'en-US'
const results = await fetchMDN('fetch');

// using a different locale
const results = await fetchMDN('fetch', { locale: 'es' });
```