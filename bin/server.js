'use strict'

const app = require('../app');
const config = require('config');
const port = process.env.PORT || config.get('Server.port');


app.listen(port, function () {
    console.log(`Up Server em ${port}`)
});