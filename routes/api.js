const express = require('express');
const router = express.Router();
const auditLogger = require('../middlewares/logger');

// POST /api/action
router.post('/action', (req, res) => {
    res.json({
        success: true,
        message: 'Action completed successfully',
        timestamp: new Date().toISOString()
    });
});

// GET /api/logs
router.get('/logs', (req, res) => {
    const logs = auditLogger.getAuditLogs();
    res.json({
        totalLogs: logs.length,
        recentLogs: logs.slice(-50)
    });
});

module.exports = router;
