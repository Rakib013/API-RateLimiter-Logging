// In-memory storage for rate limiting
const rateLimitStore = {};

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000; // 1 minute

function rateLimiter(req, res, next) {
    const clientIp = req.ip || '127.0.0.1';
    const currentTime = Date.now();
    
    // Get the info of the requested IP address.
    let ipData = rateLimitStore[clientIp];
    
    // If no data or window expired, reset
    if (!ipData || currentTime > ipData.resetTime) {
        rateLimitStore[clientIp] = {
            count: 1,
            resetTime: currentTime + WINDOW_MS
        };
        return next();
    }
    
    if (ipData.count >= MAX_REQUESTS) {
        return res.status(429).json({
            error: 'Too Many Requests',
            message: `Rate limit exceeded. Maximum ${MAX_REQUESTS} requests per minute allowed.`,
        });
    }
    
    ipData.count++;
    next();
}

module.exports = rateLimiter;