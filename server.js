/**
 * Simple HTTP Server
 * Demonstrates basic Node.js server creation
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set response headers
    res.setHeader('Content-Type', 'application/json');
    
    // Handle different routes
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            message: 'Welcome to the sample Node.js server!',
            timestamp: new Date().toISOString()
        }));
    } else if (req.url === '/health' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            status: 'healthy',
            uptime: process.uptime()
        }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            error: 'Route not found'
        }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  GET / - Welcome message');
    console.log('  GET /health - Health check');
});

module.exports = server;
