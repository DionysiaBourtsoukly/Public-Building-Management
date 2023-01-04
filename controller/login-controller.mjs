import bcrypt from 'bcrypt'

let userModel;
userModel= await import('../model/building-control-model.mjs');

export let showLogInForm = function (req, res) {
    res.render('logIn', {});
}

export let showRegisterForm = function (req, res) {
    res.render('signUp', {});
}

export let doLogin = function(req,res){
    userModel.getUserByEmail(req.body.email, (err, user) => {
        if (user == undefined) {
            res.render('logIn', {});
        }
        else {
            const match = bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (match) {
                    //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                    req.session.loggedUserId = user.id;
                    req.session.loggedUserEmail = user.email;
                    req.session.loggedUserFirstName = user.firstName;
                    req.session.loggedUserLastName = user.lastName;
                    req.session.loggedUserPhone = user.phone;
                    //Αν έχει τιμή η μεταβλητή req.session.originalUrl, αλλιώς όρισέ τη σε "/" 
                    const redirectTo = req.session.originalUrl || "/home";
                    // res.redirect("/");
                    res.redirect(redirectTo);
                    // console.log("logged in");
                    //res.render('home_page', {"name":req.session.loggedUserUsername, "role":req.session.loggedUserRole ,"loggedUserId":req.session.loggedUserId});

                }
                else {
                    res.redirect('/logIn');
                }
            })
        }
    })
}

export let doRegister = function (req, res) {
    userModel.registerUser(req.body.email, req.body.password,req.body.firstName,req.body.lastName,req.body.phone, (err, result, message) => {
        if (err) {
            console.error('registration error: ' + err);
            //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
            res.render('signUp', {});
        }
        else if (message) {
            res.render('signUp',{})
        }
        else {
            res.redirect('/logIn');
        }
    })
}

export let doLogout = (req, res) => {
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    req.session.destroy();
    res.redirect('/');
}

export let checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/logIn") || (req.originalUrl === "/signUp")) {
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /logIn")
            res.redirect('/logIn');
        }
    }
}