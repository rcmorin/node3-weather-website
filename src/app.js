const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Chase Morin'
    }) //use render vs. send
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chase Morin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please call d911',
        title: 'Help',
        name: 'Chase Morin'
    })
})

app.get('/weather', (req, res) => {

    address = req.query.address

    if (!address) {
        return res.send({
            error: 'You need to provide a address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                address: address

            })
    
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search ) {
        return res.send({   //return sends response but then stop any code below from running.
            error: 'You need to provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('my404page', {
        error: 'Help Article Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('my404page', {
        error: 'Page Not Found!'
    })
})

app.listen(port, () => {
    console.log('Server Is Up On Port ' + 3000)
})
