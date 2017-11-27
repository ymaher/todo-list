var bodyParser = require('body-parser');
//var data =[{item:'drink milk'},{item:'have fun'},{item:'sleep tight'}];
var mongoose = require('mongoose');

//connect to database
  useMongoClient: true,
mongoose.connect('mongodb://test:test@ds259105.mlab.com:59105/todo');

//create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from mongodb and pass it to view
    Todo.find({},function(err,data){
      if(err) throw err ;
        res.render('todo', {todos: data});
    });

  });

  app.post('/todo', urlencodedParser, function(req,res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    });

  });

  app.delete('/todo/:item', function(req,res){
    //delete the item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, '-')}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });
};
