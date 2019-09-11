var app= require('express')()
var bodyParser = require('body-parser')
var session = require('express-session')
var mysql= require('mysql');

//Template
app.set('views engine','ejs');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// Connetion
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'location_livres'
//   });
//   connection.connect();
//   console.log("Connexion ok")
// module.exports=connection

//Routes
app.get('/', function(req, res) {

   
  
    res.render('pages/index.ejs',{test:'Yooo'});
   
});


app.post('/', function(req, res) {
  
   if (req.body.message===undefined||req.body.message===''){
      
      console.log(req.body)
      
   }
   
});

app.listen(8081);
