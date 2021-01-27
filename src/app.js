const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./geocode')
const weather = require('./weather')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup public dir to server static
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nitin Kanwar'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.place) {
        return res.send({
            error: 'Please provide place name'
        })
    }

    var forecast = geocode(req.query.place, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 

        weather(latitude, longitude, (error, {forecast} = {}) => {
                
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                place: req.query.place
            })
        })
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You much provide search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nitin Kanwar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nitin Kanwar',
        message: 'This is help page message'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Looks like help page you\'re looking for doesn\'t exist'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Looks like page you\'re looking for doesn\'t exist'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})