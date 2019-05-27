require('dotenv').config();
const express      = require('express');
const rp           = require('request-promise');
const app          = express();
//////////////////// ENV VARS /////////////////////////
const PORT    = process.env.PORT || 3000;
const CMC_KEY = process.env.CMC_KEY;
const CMC_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

//////////////////// ROUTES ///////////////////////////
///////////////////////////////////////////////////////

// to get a list of all cryptos (200 cryptos per api credit)
app.get('/', (req, res) => {
  rp({
    method: 'GET',
    uri: `${CMC_URL}/listings/latest`,
    qs: {
      'start': '1',
      'limit': '2',
      'convert': 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': CMC_KEY
    },
    json: true,
    gzip: true
  }).then(response => {
    console.log('API call response:', response);
    let data = [];
    response.data.forEach(e => data.push({[e.symbol]: e.name}));
    // cache the data array on frontend or redis?, only fetch if it doesn't already exist
    res.json(data);
  }).catch((err) => {
    console.log('API call error:', err.message);
    res.send('Error fetching from API:\n' + err.message);
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
