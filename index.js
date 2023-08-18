
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //
const whitelist = ["http://127.0.0.1:5500", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    console.log("This is the origen: " + origin);
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    } else{
      callback(new Error('Access not allowed'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello, this is my server with express.');
});

app.get('/new-route', (req, res) => {
  res.send('Hello, this is a new route or also knew as and end point.');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening in port ' + port);
});
