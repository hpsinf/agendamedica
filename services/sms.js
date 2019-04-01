'use strict'

const TextMessageService = require('comtele-sdk').TextMessageService
const config = require('../config/default.json')

var textMessageService = new TextMessageService(config.Keys.comtele)

/**
 *
 *
 * @param {*} remetente
 * @param {*} texto
 * @param {*} dddnumero
 */
exports.send = async (remetente, texto, dddnumero) => {
    textMessageService.send(remetente, texto, [dddnumero], data => console.log(data))
}
