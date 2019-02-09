'use strict'

const app = require('../app');
const config = require('config');
const port = process.env.PORT || config.get('Server.port');
const path = require('path');


app.listen(port, function () {
    console.log(`${config.get('Server.name')} em ${port}`)
});

//Error handling
app.use((req, res, next) => {
    var err = new Error('Url não existe');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).sendFile('error.html', {root: path.join(__dirname, './')});
});

