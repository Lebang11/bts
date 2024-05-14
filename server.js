const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();


const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;



app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api', (req, res) => {
    res.send("Welcome");
})

// app.use(indexPage);
const userRoute = require("./app/api/users/route");
const sessionsRoute = require("./app/api/sessions/route");
const authRoute = require("./app/api/auth/route");

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.use("/api/sessions", sessionsRoute);


const mainURL = "https://bts-six-amber.vercel.app/api/"
app.listen(PORT, () => console.log(`Now listening at ${mainURL}`));

module.exports = app;

