
const sendgrid = require('@sendgrid/mail')
const config = require('../config/default.jason')

sendgrid.setApiKey(config.Keys.sendGrid);

/**
 *
 *
 * @param {*} to
 * @param {*} subject
 * @param {*} text
 * @param {*} body
 */
exports.send = async (to, subject, text, body, from) => {
    var msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: body
    }
    sendgrid.send(msg)
}