// In-memory storage for audit logs
const auditLogs = [];

function auditLogger(req, res, next) {
    const clientIp = req.ip || '127.0.0.1';
    const endpoint = `${req.method} ${req.originalUrl}`;
    const timestamp = new Date().toISOString();
    
    // response status
    const originalJson = res.json;
    
    res.json = function(data) {
        const status = res.statusCode === 429 ? 'blocked' : 'allowed';   
        // Add to audit logs
        auditLogs.push({
            ip: clientIp,
            endpoint: endpoint,
            timestamp: timestamp,
            status: status
        });
        console.log(`[${timestamp}] ${clientIp} -> ${endpoint} [${status}]`);
        return originalJson.call(this, data);
    };
    next();
}

// Export both the middleware and logs
module.exports = auditLogger;
module.exports.getAuditLogs = () => auditLogs;
