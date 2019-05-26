require('dotenv').config();
const express = require('express');
const rp      = require('request-promise');
const app     = express();

const PORT    = process.env.PORT || 3000;
const CMC_KEY = process.env.CMC_KEY;
const CMC_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

const requestOptions = {
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
};

/////////////////////// ROUTES ///////////////////////////
//////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  rp(requestOptions).then(response => {
    console.log('API call response:', response);
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));