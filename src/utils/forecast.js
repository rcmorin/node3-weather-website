const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/b10d8553210603069eaeecc691cc8788/' + lat + ',' + long

    //request ({ url, json: true }, (error, response) => {
    request ({ url, json: true }, (error, { body }) => {    
        if (error){
            callback ('Weather Service Is Unavailable.', undefined)
        } else if (body.error) {
            callback ('Location not found.', undefined)
        } else {
            callback (undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + 
           'There is a ' + body.currently.precipProbability + ' % chance of rain.')
        }
    })
}

module.exports = forecast