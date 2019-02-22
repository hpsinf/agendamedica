'use strict'

const TextMessageService = require('comtele-sdk').TextMessageService;
const config = require('config');
const key = config.get('Keys.comtele');

const apiKey = key;
var textMessageService = new TextMessageService(apiKey);

exports.send = async (remetente, texto, dddnumero) => {
    textMessageService.send(remetente, texto, [dddnumero], data => console.log(data));
}
