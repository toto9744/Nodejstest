var app= require('express')()
var bodyParser = require('body-parser')
var session = require('express-session')
var mysql= require('mysql');

//Template
// app.set('views', __dirname + '/views');
// app.set('views engine','ejs');


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

//Routes
app.get('/', function(req, res) {

   // if (req.session.error){
   //    res.locals.error=req.session.error
   //    req.session.error=undefined
   // }
  res.sendFile(path.join(__dirname + 'pages/index.html'));
   //res.render('pages/index.ejs');
   //res.render('pages/index.html');
});


// app.post('/', function(req, res) {
  
//    if (req.body.message===undefined||req.body.message===''){
//       req.body.message="Il une erreur"   
//       console.log(req.body)
//       res.redirect('/')
      
//    }
   
// });


app.post('/add', function(req, res) {
	var titres = req.body.titres;
	var date = req.body.date;
	if (titres && date) {
		connection.query('SELECT * FROM livres WHERE titre = ? AND date_parution = ?',[titre, date_parution], function(error, results, fields) {
			if (results.length > 0) {
				req.session.livres = true;
				req.session.titres = titres;
				res.redirect('/home');
			} else {
				res.send('Incorrect titres and/or date!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter titres and date!');
		res.end();
	}
});

app.get('/home', function(req, res) {
	if (req.session.livres) {
		res.send('Welcome back, ' + req.session.titres + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});











app.listen(8081);

