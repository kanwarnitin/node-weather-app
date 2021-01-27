const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7b479ebeb13f930d9f781a277e67a530&query=' + latitude +',' + longitude
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service. Try later', undefined)
        } else if (body.error) {
            callback('Location not found', undefined)
        } else {
            const current = body.current
            callback(undefined, {
                forecast: current.weather_descriptions[0] + ". Current temperatue is " + current.temperature + " degress with " + current.precip + " percent chances of rain."
            })
        }
    })
}

module.exports = weather