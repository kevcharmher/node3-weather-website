const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kevin Charming Her'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Kevin Charming Her' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Kevin Charming Her'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Charming Her',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('/weather', ({query}, res) => {
    if (!query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if (!req.query.search) { 
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Charming Her',
        errorMessage: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

