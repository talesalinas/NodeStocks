const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const request = require('request')

const PORT = process.env.PORT || 5000

// API KEY pk_1bb06023916a4c8093d29b42fb4518a3
// Create call_api function
function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_1bb06023916a4c8093d29b42fb4518a3',{json: true}, (err, res, body) => {
    if (err) {
        return console.log(err)
    }
    if (res.statusCode === 200) {
        finishedAPI(body)
    }
})
}

// Set Handlebars Middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Set Handlebars Routes
const testphrase = "Hi, my name is Tales."

app.get('/', function(req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        })
    })
})

// Create about page route
app.get('/about.html', function (req, res) {
    res.render('about')
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log('Server Listening on port '+ PORT))
