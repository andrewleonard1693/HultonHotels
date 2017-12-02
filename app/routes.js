// app/routes.js
module.exports = function(app, passport,io,connection) {
    
        // =====================================
        // HOME PAGE (with login links) ========
        // =====================================
        app.get('/', function(req, res) {
            res.render('homepage');
            //{ message: req.flash('signupMessage') }); // load the index.ejs file
        });
    
        // =====================================
        // LOGIN ===============================
        // =====================================

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }),function(req, res) {
                if (req.body.remember) {
                    req.session.cookie.maxAge = 1000 * 60 * 3;
                } else {
                    req.session.cookie.expires = false;
                }
                res.redirect('/');
        });
    
        // =====================================
        // SIGNUP ==============================
        // =====================================
        // show the signup form
    
        // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),function(req,res){
            console.log("register request route hit")
        });
        // =====================================
        // PROFILE SECTION =========================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        app.get('/profile', function(req, res) {
            res.redirect('/profile/'+req.user.username);
        });

        app.get('/profile/:username',isLoggedIn,function(req,res){
            //original url
            console.log("Original url "+req.originalUrl);
            res.render('profile', {
                user : req.user.username,
                originalUrl: req.originalUrl,
                hotelTitle: "All Hotels", // get the user out of session and pass to template
                myReservations: req.originalUrl+"/myreservations",
                myReviews: req.originalUrl+"/myreviews",
                searchRoute: req.originalUrl+"/search" 
            });
        })

        //route to display the current user's reservations
        app.get("/profile/:username/myreservations",function(req,res){
            res.render("myreservations");
        })

        //route for the reserve hotel page
        app.get("/profile/:username/:hotelId/reservation",function(req,res){
            //query the database for the 
            res.render('reservation',
            {   hotelId: req.params.hotelId,
                location:req.params.location,
                user: req.params.username
            })
        })
        //route to render all of the hotels with the user searched state
        app.get("/profile/:username/:state",function(req,res){
            console.log("state is "+req.params.state);
            //perform query logic to get the hotel information from the user inputted states
            // var hotels = getSearchedStates(req.params.state);
            //res.render('profile',{
                //hotels: hotels
            })
            
            // res.render('profile',{
            // })
        //route for the write a review page
        app.get("/profile/:username/:state/:hotelId/review",function(req,res){

        });
        //route for the post of the search term for the states
        app.post("/profile/:username/search",function(req,res){
            res.redirect("/profile/"+req.params.username+"/"+req.body.state);
        })

        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
    };
    
    // route middleware to make sure
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()){
            console.log("isloggedin")
            return next();  
        }else{
            console.log("not authneitcated")
            res.redirect('/')  
        }
    }
    