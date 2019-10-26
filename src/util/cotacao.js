const request = require('request');
const chalk = require('chalk')
const api_token = 'dR8G7xqgwMBjAQQx5gckZtC20asyLMcZeoJ3NDUSNmCJv6U5A3NwS3lOEghy';
const cotacao = (symbol, callback) => {

    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            return callback({
                mensage: `Ocorreu um erro ${error}`,
                code: 500
            }, undefined)
        }
        if (response.body === undefined || response.body.data === undefined ||
            response.Message !== undefined) {
            return callback({
                mensage: `Não existe retorno`,
                code: 404
            }, undefined)
        }

        const parseJson = response.body.data[0];
        //abertura fechamento maior alta menor baixa
        const { symbol, price_open, price, day_high, day_low } = parseJson
        callback(undefined, { symbol, price_open, price, day_high, day_low })

    })

}

module.exports = cotacao