
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

// import static configuration
const config = dotenv.config();

if (config.error) {
  throw config.error
}
console.log(config.parsed)

// setup express
const app = express();

app.use(cors()) // allow cors (in prod should be adjusted properly)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add routers
const signupRouter = require('./routes/signupRouter');

app.use('/api/signup', signupRouter);

// start the server
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Express listening on port ${port}`);
});

module.exports.app = app;