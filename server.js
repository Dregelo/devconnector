const express = require('express'),
    mongoose = require('mongoose'),
    users = require('./routes/api/users'),
    profile = require('./routes/api/profile'),
    posts = require('./routes/api/posts'),
    path = require('path')
    bodyParser = require('body-parser'),
    passport = require('passport'),
    keys = require('./config/keys')


mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true} )
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err))

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})