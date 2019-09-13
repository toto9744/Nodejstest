var app= require('express')()
var bodyParser = require('body-parser')
var session = require('express-session')
var mysql= require('mysql');

//Template

//app.set('port', process.env.PORT || 8081);
app.set('views', __dirname + '/views');
app.set('views engine','ejs');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// Connetion
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'location_livres'
  });
  connection.connect();
  console.log("Connexion ok")
module.exports=connection


//Import route
const livreRoutes = require('./routes/index');


//Route
app.use('ajout/livre', livreRoutes);



//Routes
 app.get('/', function(req, res) {

   if (req.session.error){
      res.locals.error=req.session.error
      req.session.error=undefined
   }
 
   res.render('pages/index.ejs');
   
});

 app.post('/', function(req, res) {
  
   if (req.body.message===undefined||req.body.message===''){
      req.body.message="Il une erreur"   
      console.log(req.body)
      res.redirect('/')
      
   }
   
});


// starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
  });
  









