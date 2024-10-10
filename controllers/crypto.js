const CryptoData = require('../models/crypto');


// Get the latest stats for a cryptocurrency
exports.getStats = async (req, res) => {
  const { coin } = req.query;

  try {
    const latestData = await CryptoData.findOne({ name: coin }).sort({ timestamp: -1 });
    if (!latestData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json({
      price: latestData.current_price,
      marketCap: latestData.market_cap,
      '24hChange': latestData.change_24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get the standard deviation of the price for the last 100 records
exports.getDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    const records = await CryptoData.find({ name: coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length === 0) {
      return res.status(404).json({ message: 'Not enough data available' });
    }

    const prices = records.map(record => record.current_price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: stdDeviation });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
