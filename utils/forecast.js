const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/573af6e331f8c1d7b1568f3ab224cd3d/' + latitude + ',' + longitude
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service')
        } else if(body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast 