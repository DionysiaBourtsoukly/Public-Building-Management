'use strict';
import db from 'better-sqlite3'
import bcrypt from 'bcrypt'
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_name = path.join(__dirname, "proj10.db");

const sql = new db('./model/proj10.sqlite', { fileMustExist: true });

const  query = (text, params, callback) => {
    const db = new sqlite3.Database(db_name);
    return db.query(text, params, callback)
}


export let connect = (callback) => {
    callback(null, true)
}

export let findUserByUsernamePassword = (username, password, callback) => {
    const stmt = sql.prepare("SELECT email FROM user WHERE email = ? and password = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username, password);
    } catch (err) {
        callback(err, null);
    }
    callback(null, user);
}

export let getUserByEmail = (username, callback) => {
    const stmt = sql.prepare("SELECT id, email, password, firstName, lastName, phone, domain, sector FROM user WHERE email = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    } catch (err) {
        callback(err, null);
    }
    // console.log(user);
    callback(null, user[0])
}

export let getUserById = (id, callback) => {
    const stmt = sql.prepare("SELECT id, email, password, firstName, lastName, phone FROM user WHERE id = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(id);
    } catch (err) {
        callback(err, null);
    }

    callback(null, user[0])
}

export let registerUser = function (firstName,lastName,phone,username,sector,domain, password, callback) {
    getUserByEmail(username, async (err, userId) => {
        if (userId != undefined) {
            callback(null, null, { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" })
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const role = 0;
                const stmt = sql.prepare('INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, ?, ?)');
                let info;
                try {
                    info = stmt.run(firstName, lastName, phone,username, domain, sector, hashedPassword);
                }
                catch (err) {
                    callback(err, null);
                }
                callback(null, info.lastInsertRowid);
            } catch (error) {
                callback(error);
            }
        }

    })
}

export let getSensors = (callback) => {
    const sql = "select buildingId as building,floorId as floor,roomId as room,sensor.id as c1, value as c2, batteryLevel as c3, airQualitySensor.id as c4, energySensor.id as c5 , lightSensor.id  as c6,temperatureSensor.id as c7 from (((((((sensor join room on roomId = room.id) join floor on floorId = floor.id) join buildings on buildingId = buildings.id) LEFT join airQualitySensor on sensor.id = airQualitySensor.id) LEFT join energySensor on sensor.id = energySensor.id) LEFT join lightSensor on sensor.id = lightSensor.id) left join temperatureSensor on sensor.id = temperatureSensor.id) UNION ALL select buildings.id as building, floor.id as floor, room.id as room, state as c1, ac.id as c2,ac.heat as c3, light.id as c4, light.level as c5, plug.id as c6, ventilation.id as c7 from buildings join floor on floor.buildingId = buildings.id join room on room.floorId = floor.id join device on device.roomId = room.id left join ac on ac.id = device.id left join light on light.id = device.id left join plug on plug.id = device.id left join ventilation on ventilation.id = device.id";
    const db = new sqlite3.Database(db_name);
    db.all(sql, (err, rows) => {
        if(err) {
            db.close();
            callback(err, null);
        }
        callback(null, rows);
    });
}

export let getProblemReports1 = (callback) =>{
    const sql = "select room_id,title,date,time,floorId,buildingId from problemReports join room on room_id = room.id join floor on room.floorId = floor.id join buildings on floor.buildingId = buildings.id where buildings.id = 1";
    const db = new sqlite3.Database(db_name);
    db.all(sql, (err, rows) => {
        if(err) {
            db.close();
            callback(err, null);
        }
        callback(null, rows);
    });
}
export let getProblemReports2 = (callback) =>{
    const sql = "select room_id,title,date,time,floorId,buildingId from problemReports join room on room_id = room.id join floor on room.floorId = floor.id join buildings on floor.buildingId = buildings.id where buildings.id = 2";
    const db = new sqlite3.Database(db_name);
    db.all(sql, (err, rows) => {
        if(err) {
            db.close();
            callback(err, null);
        }
        callback(null, rows);
    });
}
export let getProblemReports3 = (callback) =>{
    const sql = "select room_id,title,date,time,floorId,buildingId from problemReports join room on room_id = room.id join floor on room.floorId = floor.id join buildings on floor.buildingId = buildings.id where buildings.id = 3";
    const db = new sqlite3.Database(db_name);
    db.all(sql, (err, rows) => {
        if(err) {
            db.close();
            callback(err, null);
        }
        callback(null, rows);
    });
}

export let updateDevices = function(x,y,z,callback){
    let info;
    let info2;
    let xx=parseInt(x);
    let yy = parseInt(y);
    let zz = parseInt(z);
    const stmt2 = sql.prepare('UPDATE device set state = ? WHERE id = ?');
    try{
        info2 = stmt2.run(yy,xx);
    }
    catch(err){
        callback(err, null);
        console.log(err);
    }
    if (zz!=0){
        if (zz>100){
            const stmt = sql.prepare('UPDATE light set level = ? WHERE id = ?');
            try{
                info = stmt.run(zz,xx);
            }
            catch(err){
                callback(err, null);
                console.log(err);
            }
        }
        else {
            const stmt = sql.prepare('UPDATE ac set desired = ? WHERE id = ?');
            try{
                info = stmt.run(zz,xx);
            }
            catch(err){
                callback(err, null);
                console.log(err);
            }
        }
    }
}