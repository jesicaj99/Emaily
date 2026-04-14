const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey')
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// three app.use calls wiring up middleware
// middleware is about doing pre processing of incoming request before they are sent to to our different root handlers
app.use(bodyParser.json());
// cookie session is processing the incoming request
// passport accesses the data that exist in the record session
app.use(
    cookieSession({ // two libaries cookie-session(cookie is session, data inside) and express-session(cookie refrences session, data outside)
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js file or main.css file
    app.use(express.static('client/build'));  // checks for specific file

    // Express will serve up the index.html file
    // if it does not recognize the route
    const path = require('path'); // catch all case
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
