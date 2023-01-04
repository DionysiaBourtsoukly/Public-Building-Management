//Express.js
import express from 'express'
import { query } from 'express';
//Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars';
import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as logInController from './controller/login-controller.mjs'
import buildingControlSession from './app-setup/app-setup-session.mjs'
import * as userModel from './model/building-control-model.mjs'
import session from 'express-session';

const app = express()
const router = express.Router();

app.use(express.static('public'))

app.engine('hbs', engine({ extname: 'hbs' }));
app.engine('mjs', engine({ extname: 'mjs' }));

app.use(express.urlencoded({ extended: false }));
app.use(buildingControlSession);

//Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
app.set('view engine', 'hbs');

let getAllElements = function (callback) {
    callback(null, {});
};

// functions for req, res
let home = function(req,res){
    getAllElements(function(err,tasks){
        if (err) {
            res.send(err);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            res.render('home',{});
        }
    });
}

let buildings = function(req,res){
    getAllElements(function(err,tasks){
        if (err) {
            res.send(err);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            res.render('buildings',{});
        }
    });
}

let map = function(req,res){
    getAllElements(function(err,tasks){
        if (err) {
            res.send(err);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            res.render('map',{});
        }
    });
}

let problemReports = function(req,res){
    getAllElements(function(err,tasks){
        if (err) {
            res.send(err);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            res.render('problemReports',{});
        }
    });
}

let profile = function(req,res){
    getAllElements(function(err,tasks){
        if (err) {
            res.send(err);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            res.render('profile',{});
        }
    });
}


app.use(router);

router.route('').get(home);


router.route('/logIn').get(logInController.checkAuthenticated, logInController.showLogInForm);
router.route('/logIn').post(logInController.doLogin);

router.route('/signUp').get(logInController.checkAuthenticated, logInController.showRegisterForm);
router.post('/signUp', logInController.doRegister);

router.route('/regain-password').get(logInController.checkAuthenticated, logInController.showRegisterForm);
router.post('/regain-password', logInController.doRegister);

router.route('/home').get(home);
router.route('/buildings').get(buildings);
router.route('/map').get(map);
router.route('/problemReports').get(problemReports);
router.route('/profile').get(profile);

//logout
router.route('/logout').get(logInController.doLogout);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

