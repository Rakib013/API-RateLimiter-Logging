const express = require('express');
const app = express();

const limit = require('./middlewares/limit_check');
const logger = require('./middlewares/logger');

const apiRoutes = require('./routes/api');

// Middleware configuration
app.use(express.json());
app.set('trust proxy', true);

// Apply middlewares for auddit logging and rate limiting
app.use(logger);
app.use('/api', limit);

app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'API Rate Limiter & Audit Logger',
        endpoints: {
            action: 'POST /api/action',
            logs: 'GET /api/logs'
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\nServer running on http://localhost:${PORT}`);
});