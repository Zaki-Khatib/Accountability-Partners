const http = require('http');

const data = JSON.stringify({
    name: "Verify Node",
    email: `verify_${Date.now()}@example.com`,
    password: "password123"
});

const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (d) => { body += d; });
    res.on('end', () => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`BODY: ${body}`);
        process.exit(res.statusCode === 200 || body.includes('msg') ? 0 : 1);
    });
});

req.on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
    process.exit(1);
});

req.write(data);
req.end();
