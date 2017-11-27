var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use('/assets', express.static('./assets'));

//fire controllers
todoController(app);


//listen to 3000
app.listen(3200);
console.log('yo listening to 3000');
