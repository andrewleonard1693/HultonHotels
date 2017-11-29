

// node package variable declarations
var mysql       	= 	require('mysql'),
    bodyParser	  =	  require('body-parser'),
    cookieParser  =   require('cookie-parser'),
    express       =   require('express');
    app           =   express(),
    server        =   require('http').Server(app),
    io            =   require('socket.io')(server);
    //tell the server to listen on port 8080
    server.listen(8080);


//===========MYSQL CONNECTION===========    
//create the connection details to the mysql database
var connection = mysql.createConnection({
  host     : 'db-instance.cgs2c9qhx8la.us-east-2.rds.amazonaws.com',
  port	   : '3306',
  user     : 'ajl246',
  password : 'db-master-password',
  database: 'PristineHotels'
});
//connect to db
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
//================SOCKET.IO================
//testing connection between front end and back end 
io.on('connection',function(socket){
  socket.emit('testConnection', {data: "This is test data."});
})

//===============EXPRESS SETUP==============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//set the view engine to ejs
app.set('view engine','ejs');
//allow the express app to render the static files in the public folder
app.use(express.static('public'));


//================ROUTES==================

//route for homepage
app.get('/', function (req, res) {
  //render the homepage template
  res.render('homepage');
});

//route for a user profile
app.get('/profile',function(req,res){
  res.render('profile');
})

//This route is activated when the user clicks the create account button
app.post('/register',function(req,res){
  console.log("hello");
  var username = req.body.createAccountUsername,
      password = req.body.createAccountPassword,
      email    = req.body.createAccountEmail;
  //req.body holds json formatted information from the input text field that the user has submitted
  //we can parse req.body to grab the inputted info and check the infor agains the database
  console.log(req.body);
});

//route activated when the user clicks enter in the search field
app.post('/search',function(req,res){
  //grab the state that the user searched for
  var requestedState = req.body.state;
  console.log(req.body);
})

//This route is activated when the user clicks to login
app.post('/login',function(req,res){
  console.log("login");
  var username = req.body.loginUsername,
      password = req.body.loginPassword;
  console.log(req.body);
});