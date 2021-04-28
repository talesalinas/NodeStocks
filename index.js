const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')

const PORT = process.env.PORT || 5000

// Set Handlebars Middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Set Handlebars Routes
const testphrase = "Hi, my name is Tales."

app.get('/', function(req, res) {
    res.render('home', {
        test: testphrase
    })
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log('Server Listening on port '+ PORT))
