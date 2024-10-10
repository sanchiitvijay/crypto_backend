const express = require('express');
const database = require('./config/database');
const cryptoRoutes = require('./routes/crypto');
const dotenv=require("dotenv");
const cors=require("cors");
const {fetchCryptoData} = require('./jobs/crypto');

const cron = require('node-cron');

const app = express();
dotenv.config();

// Using * as origin since we dont have any frontend for this project
app.use(
    cors({
        origin:"*",
        // origin:"frontendurl",
        // credentials:true
    })
);
database.connect();

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);


// Use routes
app.use('/api/v1', cryptoRoutes);


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
