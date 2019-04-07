
const app = require('../app');
const config = require('../config/default.json');
const port = process.env.PORT || config.Server.port;
const path = require('path');
const mongoose = require('../services/connect');

app.listen(port, function () {
    console.log(`${config.Server.name} em ${port}`)
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

