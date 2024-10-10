const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: String,
  current_price: Number,
  market_cap: Number,
  change_24h: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const CryptoData = mongoose.model('CryptoData', cryptoSchema);
module.exports = CryptoData;
