'use strict'

const sendgrid = require('@sendgrid/mail');
const config = require('config');
key = config.get('Keys.sendGrid');
sendgrid.setApiKey(key);

exports.send = async (to, subject, text, body) => {
    var msg = {
        to: to,
        from: 'apibase-nao-renponda@mail.com',
        subject: subject,
        text: text,
        html: body
    }
    sendgrid.send(msg);
}