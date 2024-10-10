const axios = require('axios');
const CryptoData = require('../models/crypto');

exports.fetchCryptoData = async() => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,matic-network',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
      }
    });
    console.log('cron is working.');
    const data = response.data;
    const cryptos = [
      { name: 'bitcoin', data: data['bitcoin'] },
      { name: 'ethereum', data: data['ethereum'] },
      { name: 'matic-network', data: data['matic-network'] }
    ];

    for (const crypto of cryptos) {
      const newEntry = new CryptoData({
        name: crypto.name,
        current_price: crypto.data.usd,
        market_cap: crypto.data.usd_market_cap,
        change_24h: crypto.data.usd_24h_change
      });
      await newEntry.save();
      console.log(`${crypto.name} data saved.`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
