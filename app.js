

// node package declarations
var mysql      	= 	require('mysql'),
  socket		= 	require('socketio'),
	bodyParser	=	require('body-parser'),
	express		=	require('express'),
	app			=	express();

//create the connection details to the mysql database
var connection = mysql.createConnection({
  host     : 'db-instance.cgs2c9qhx8la.us-east-2.rds.amazonaws.com',
  port	   : '3306',
  user     : 'ajl246',
  password : 'db-master-password'
});
//connect to db
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
//set the view engine to ejs
app.set('view engine','ejs');

//allow the express app to render the static files in the public folder
app.use(express.static('public'));


//route for homepage
app.get('/', function (req, res) {
  res.render('homepage');
});
//node app is listening on port
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})