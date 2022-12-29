//Express.js
import express from 'express'
import { query } from 'express';
//Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars';
import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import * as logInController from './controller/login-controller.mjs'
// import buildingControlSession from './app-setup/app-setup-session.mjs'
// import * as userModel from './model/building-control-model.mjs'

const app = express()
const router = express.Router();

app.use(express.static('public'))

app.engine('hbs', engine({ extname: 'hbs' }));
app.engine('mjs', engine({ extname: 'mjs' }));

app.use(express.urlencoded({ extended: false }));
// app.use(buildingControlSession);

//Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. θα ενεργοποιείται με την res.render()) 
app.set('view engine', 'hbs');

let getAllElements = function (callback) {
    callback(null, {});
};

// functions for req, res


app.use(router);

router.route('').get(home);

router.route('/log-in').get(logInController.checkAuthenticated, logInController.showLogInForm);
router.route('/log-in').post(logInController.doLogin);

router.route('/sign-up').get(logInController.checkAuthenticated, logInController.showRegisterForm);
router.post('/sign-up', logInController.doRegister);

router.route('/regain-password').get(logInController.checkAuthenticated, logInController.showRegisterForm);
router.post('/regain-password', logInController.doRegister);

router.route('/home').get(home);
router.route('/buildings').get(buildings);
router.route('/map').get(map);
router.route('/problem-reports').get(problemReports);
router.route('/profile').get(profile);

//logout
router.route('/logout').get(logInController.doLogout);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

