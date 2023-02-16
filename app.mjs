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
    userModel.getSensors((err,rows) => {
        if (err) {
            return console.error(err.message);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            let table = new Array();
            for (let i=0; i<91;i++){
                let row = new Array();
                row.push(rows[i].building);
                row.push(rows[i].floor);
                row.push(rows[i].room);
                row.push(rows[i].c1);
                row.push(rows[i].c2);
                row.push(rows[i].c3);
                if(!rows[i].c4){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c4);
                }
                if(!rows[i].c5){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c5);
                }
                if(!rows[i].c6){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c6);
                }
                if(!rows[i].c7){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c7);
                }
                table.push(row);
            }
            let table2 = new Array();
            for (let i=91; i<182;i++){
                let row = new Array();
                row.push(rows[i].building);
                row.push(rows[i].floor);
                row.push(rows[i].room);
                row.push(rows[i].c1);
                if(!rows[i].c2){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c2);
                }
                if(!rows[i].c3){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c3);
                }
                if(!rows[i].c4){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c4);
                }
                if(!rows[i].c5){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c5);
                }
                if(!rows[i].c6){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c6);
                }
                if(!rows[i].c7){
                    row.push("0");
                }
                else {
                    row.push(rows[i].c7);
                }
                table2.push(row);
            }
            res.render('buildings',{data: table,data2:table2});
        }
    })
    // getAllElements(function(err,tasks){
        //     if (err) {
        //         res.send(err);
        //     }
            // else if(req.session.loggedUserEmail == null){
            //     res.redirect('/logIn');
            // }
            // else{
            //     res.render('buildings',{});
            // }
        // });
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

let problemReports1 = function(req,res){
    userModel.getProblemReports1((err,rows) => {
        if (err) {
            return console.error(err.message);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            let table = new Array();
            for(let i of rows){
                let j = new Object();
                j.title = i.title;
                j.room = i.room_id;
                j.time = i.time;
                j.date = i.date;
                table.push(j);
            }
            res.render('problemReports',{pr:table});
        }
    });
}
let problemReports2 = function(req,res){
    userModel.getProblemReports2((err,rows) => {
        if (err) {
            return console.error(err.message);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            let table = new Array();
            for(let i of rows){
                let j = new Object();
                j.title = i.title;
                j.room = i.room_id;
                j.time = i.time;
                j.date = i.date;
                table.push(j);
            }
            res.render('problemReports',{pr:table});
        }
    });
}
let problemReports3 = function(req,res){
    userModel.getProblemReports3((err,rows) => {
        if (err) {
            return console.error(err.message);
        }
        else if(req.session.loggedUserEmail == null){
            res.redirect('/logIn');
        }
        else{
            let table = new Array();
            for(let i of rows){
                let j = new Object();
                j.title = i.title;
                j.room = i.room_id;
                j.time = i.time;
                j.date = i.date;
                table.push(j);
            }
            res.render('problemReports',{pr:table});
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
            let b = req.session.loggedUserEmail;
            res.render('profile',{"fname":req.session.loggedUserFirstName, "lname":req.session.loggedUserLastName, "email":req.session.loggedUserEmail, "domain":req.session.loggedUserDomain,"sector":req.session.loggedUserSector,"phone":req.session.loggedUserPhone});
        }
    });
}


app.use(router);

router.route('').get(home);


router.route('/logIn').get(logInController.checkAuthenticated, logInController.showLogInForm);
router.route('/logIn').post(logInController.doLogin);

router.route('/signUp').get(logInController.checkAuthenticated, logInController.showRegisterForm);
router.post('/signUp', logInController.doRegister);

router.route('/regainPassword').get(logInController.checkAuthenticated, logInController.showRegisterForm);
router.post('/regainPassword', logInController.doRegister);

router.route('/home').get(home);
router.route('/buildings').get(buildings);
router.route('/map').get(map);
router.route('/problemReports').get(problemReports1);
router.route('/b1').get(problemReports1);
router.route('/b2').get(problemReports2);
router.route('/b3').get(problemReports3);
router.route('/profile').get(profile);

router.route('/update-devices/:x/:y/:z').get((req,res)=>{
    userModel.updateDevices(req.params.x,req.params.y,req.params.z,(err,rows) =>{
        if(err){
            return console.error(err.message);
        }
        res.redirect('buildings');
    })
})

//logout
router.route('/logout').get(logInController.doLogout);

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port " + port) });

