# API Rate Limiter & Audit Logger

## How to Run the Project

1. **Install dependencies**:
   ```
   npm install express
   ```

2. **Start the server**:
   ```
   node server.js
   ```

3. **Server will run on**: `http://localhost:3000`

## Available Endpoints

- `GET /` - API information and available endpoints
- `POST /api/action` - Test endpoint for rate limiting
- `GET /api/logs` - View recent audit logs (last 50 entries)

## Rate Limiting Rules

- **Limit**: 10 requests per IP address
- **Time Window**: 60 seconds (1 minute)
- **Scope**: Applied to all `/api/*` routes
- **Response**: Returns `429 Too Many Requests` when limit exceeded
- **Reset**: Counter automatically resets after the time window expires

## Storage Choice and Reasoning

**In-Memory Storage** (JavaScript objects) is used for both rate limiting and audit logs.

**Advantages**:
- Zero external dependencies (no database required)
- Simple implementation for development and testing
- No setup or configuration needed

**Limitations**:
- Data is lost when server restarts
- Not suitable for distributed/multi-server environments
- Memory usage grows with traffic
