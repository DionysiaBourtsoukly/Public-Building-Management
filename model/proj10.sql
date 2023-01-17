BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER NOT NULL UNIQUE,
	"firstName"	TEXT NOT NULL,
	"lastName"	TEXT NOT NULL,
	"phone"	NUMERIC NOT NULL UNIQUE,
	"email"	TEXT NOT NULL UNIQUE,
	"domain" TEXT NOT NULL,
	"sector" TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "tesmperature sensor" (
	"id"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("id") REFERENCES "sensor"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "energy sensor" (
	"id"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("id") REFERENCES "sensor"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "air quality sensor" (
	"id"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("id") REFERENCES "sensor"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "light sensor" (
	"id"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("id") REFERENCES "sensor"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "ac" (
	"id"	INTEGER NOT NULL UNIQUE,
	"heat"	INTEGER NOT NULL,
	FOREIGN KEY("id") REFERENCES "device"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "ventilation" (
	"id"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("id") REFERENCES "device"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "light" (
	"id"	INTEGER NOT NULL UNIQUE,
	"level"	NUMERIC NOT NULL,
	FOREIGN KEY("id") REFERENCES "device"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "plug" (
	"id"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("id") REFERENCES "device"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "floor" (
	"id"	INTEGER NOT NULL UNIQUE,
	"buildingId"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("buildingId") REFERENCES "buildings"("id")
);
CREATE TABLE IF NOT EXISTS "room" (
	"id"	INTEGER NOT NULL UNIQUE,
	"floorId"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("floorId") REFERENCES "floor"("id")
);
CREATE TABLE IF NOT EXISTS "sensor" (
	"id"	INTEGER NOT NULL UNIQUE,
	"value"	REAL NOT NULL,
	"battery level"	REAL NOT NULL,
	"roomId"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("roomId") REFERENCES "room"("id")
);
CREATE TABLE IF NOT EXISTS "device" (
	"id"	INTEGER NOT NULL UNIQUE,
	"state"	INTEGER NOT NULL,
	"roomId"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("roomId") REFERENCES "room"("id")
);
CREATE TABLE IF NOT EXISTS "control" (
	"deviceId"	INTEGER,
	"userId"	INTEGER,
	FOREIGN KEY("deviceId") REFERENCES "device"("id"),
	FOREIGN KEY("userId") REFERENCES "user"("id")
);
CREATE TABLE IF NOT EXISTS "responsible for" (
	"buildingId"	INTEGER,
	"userId"	INTEGER,
	FOREIGN KEY("buildingId") REFERENCES "buildings"("id")
);
CREATE TABLE IF NOT EXISTS "buildings" (
	"id"	INTEGER NOT NULL UNIQUE,
	"energy consumption"	NUMERIC,
	"latitude"	REAL NOT NULL,
	"longtitude"	REAL NOT NULL,
	"address"	TEXT NOT NULL,
	UNIQUE("latitude","longtitude"),
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "tesmperature sensor" VALUES (1);
INSERT INTO "tesmperature sensor" VALUES (6);
INSERT INTO "tesmperature sensor" VALUES (12);
INSERT INTO "tesmperature sensor" VALUES (16);
INSERT INTO "tesmperature sensor" VALUES (20);
INSERT INTO "tesmperature sensor" VALUES (25);
INSERT INTO "tesmperature sensor" VALUES (29);
INSERT INTO "tesmperature sensor" VALUES (33);
INSERT INTO "tesmperature sensor" VALUES (38);
INSERT INTO "tesmperature sensor" VALUES (42);
INSERT INTO "tesmperature sensor" VALUES (47);
INSERT INTO "tesmperature sensor" VALUES (51);
INSERT INTO "tesmperature sensor" VALUES (56);
INSERT INTO "tesmperature sensor" VALUES (60);
INSERT INTO "tesmperature sensor" VALUES (65);
INSERT INTO "tesmperature sensor" VALUES (70);
INSERT INTO "tesmperature sensor" VALUES (74);
INSERT INTO "tesmperature sensor" VALUES (78);
INSERT INTO "tesmperature sensor" VALUES (83);
INSERT INTO "tesmperature sensor" VALUES (87);
INSERT INTO "energy sensor" VALUES (4);
INSERT INTO "energy sensor" VALUES (5);
INSERT INTO "energy sensor" VALUES (9);
INSERT INTO "energy sensor" VALUES (10);
INSERT INTO "energy sensor" VALUES (11);
INSERT INTO "energy sensor" VALUES (15);
INSERT INTO "energy sensor" VALUES (19);
INSERT INTO "energy sensor" VALUES (23);
INSERT INTO "energy sensor" VALUES (24);
INSERT INTO "energy sensor" VALUES (28);
INSERT INTO "energy sensor" VALUES (32);
INSERT INTO "energy sensor" VALUES (36);
INSERT INTO "energy sensor" VALUES (37);
INSERT INTO "energy sensor" VALUES (41);
INSERT INTO "energy sensor" VALUES (45);
INSERT INTO "energy sensor" VALUES (46);
INSERT INTO "energy sensor" VALUES (50);
INSERT INTO "energy sensor" VALUES (54);
INSERT INTO "energy sensor" VALUES (55);
INSERT INTO "energy sensor" VALUES (59);
INSERT INTO "energy sensor" VALUES (63);
INSERT INTO "energy sensor" VALUES (64);
INSERT INTO "energy sensor" VALUES (68);
INSERT INTO "energy sensor" VALUES (69);
INSERT INTO "energy sensor" VALUES (73);
INSERT INTO "energy sensor" VALUES (77);
INSERT INTO "energy sensor" VALUES (81);
INSERT INTO "energy sensor" VALUES (82);
INSERT INTO "energy sensor" VALUES (86);
INSERT INTO "energy sensor" VALUES (90);
INSERT INTO "energy sensor" VALUES (91);
INSERT INTO "air quality sensor" VALUES (2);
INSERT INTO "air quality sensor" VALUES (7);
INSERT INTO "air quality sensor" VALUES (13);
INSERT INTO "air quality sensor" VALUES (17);
INSERT INTO "air quality sensor" VALUES (21);
INSERT INTO "air quality sensor" VALUES (26);
INSERT INTO "air quality sensor" VALUES (30);
INSERT INTO "air quality sensor" VALUES (34);
INSERT INTO "air quality sensor" VALUES (39);
INSERT INTO "air quality sensor" VALUES (43);
INSERT INTO "air quality sensor" VALUES (48);
INSERT INTO "air quality sensor" VALUES (52);
INSERT INTO "air quality sensor" VALUES (57);
INSERT INTO "air quality sensor" VALUES (61);
INSERT INTO "air quality sensor" VALUES (66);
INSERT INTO "air quality sensor" VALUES (71);
INSERT INTO "air quality sensor" VALUES (75);
INSERT INTO "air quality sensor" VALUES (79);
INSERT INTO "air quality sensor" VALUES (84);
INSERT INTO "air quality sensor" VALUES (88);
INSERT INTO "light sensor" VALUES (3);
INSERT INTO "light sensor" VALUES (8);
INSERT INTO "light sensor" VALUES (14);
INSERT INTO "light sensor" VALUES (18);
INSERT INTO "light sensor" VALUES (22);
INSERT INTO "light sensor" VALUES (27);
INSERT INTO "light sensor" VALUES (31);
INSERT INTO "light sensor" VALUES (35);
INSERT INTO "light sensor" VALUES (40);
INSERT INTO "light sensor" VALUES (44);
INSERT INTO "light sensor" VALUES (49);
INSERT INTO "light sensor" VALUES (53);
INSERT INTO "light sensor" VALUES (58);
INSERT INTO "light sensor" VALUES (62);
INSERT INTO "light sensor" VALUES (67);
INSERT INTO "light sensor" VALUES (72);
INSERT INTO "light sensor" VALUES (76);
INSERT INTO "light sensor" VALUES (80);
INSERT INTO "light sensor" VALUES (85);
INSERT INTO "light sensor" VALUES (89);
INSERT INTO "ac" VALUES (1,0);
INSERT INTO "ac" VALUES (6,1);
INSERT INTO "ac" VALUES (12,1);
INSERT INTO "ac" VALUES (16,0);
INSERT INTO "ac" VALUES (20,0);
INSERT INTO "ac" VALUES (25,1);
INSERT INTO "ac" VALUES (29,0);
INSERT INTO "ac" VALUES (33,1);
INSERT INTO "ac" VALUES (38,0);
INSERT INTO "ac" VALUES (42,1);
INSERT INTO "ac" VALUES (47,0);
INSERT INTO "ac" VALUES (51,1);
INSERT INTO "ac" VALUES (56,0);
INSERT INTO "ac" VALUES (60,1);
INSERT INTO "ac" VALUES (65,0);
INSERT INTO "ac" VALUES (70,1);
INSERT INTO "ac" VALUES (74,0);
INSERT INTO "ac" VALUES (78,1);
INSERT INTO "ac" VALUES (83,0);
INSERT INTO "ac" VALUES (87,1);
INSERT INTO "ventilation" VALUES (2);
INSERT INTO "ventilation" VALUES (7);
INSERT INTO "ventilation" VALUES (13);
INSERT INTO "ventilation" VALUES (17);
INSERT INTO "ventilation" VALUES (21);
INSERT INTO "ventilation" VALUES (26);
INSERT INTO "ventilation" VALUES (30);
INSERT INTO "ventilation" VALUES (34);
INSERT INTO "ventilation" VALUES (39);
INSERT INTO "ventilation" VALUES (43);
INSERT INTO "ventilation" VALUES (48);
INSERT INTO "ventilation" VALUES (52);
INSERT INTO "ventilation" VALUES (57);
INSERT INTO "ventilation" VALUES (61);
INSERT INTO "ventilation" VALUES (66);
INSERT INTO "ventilation" VALUES (71);
INSERT INTO "ventilation" VALUES (75);
INSERT INTO "ventilation" VALUES (79);
INSERT INTO "ventilation" VALUES (84);
INSERT INTO "ventilation" VALUES (88);
INSERT INTO "light" VALUES (3,1);
INSERT INTO "light" VALUES (8,2);
INSERT INTO "light" VALUES (14,4);
INSERT INTO "light" VALUES (18,2);
INSERT INTO "light" VALUES (22,1);
INSERT INTO "light" VALUES (27,3);
INSERT INTO "light" VALUES (31,4);
INSERT INTO "light" VALUES (35,5);
INSERT INTO "light" VALUES (40,1);
INSERT INTO "light" VALUES (44,2);
INSERT INTO "light" VALUES (49,3);
INSERT INTO "light" VALUES (53,4);
INSERT INTO "light" VALUES (58,5);
INSERT INTO "light" VALUES (62,5);
INSERT INTO "light" VALUES (67,1);
INSERT INTO "light" VALUES (72,2);
INSERT INTO "light" VALUES (76,3);
INSERT INTO "light" VALUES (80,4);
INSERT INTO "light" VALUES (85,5);
INSERT INTO "light" VALUES (89,3);
INSERT INTO "plug" VALUES (4);
INSERT INTO "plug" VALUES (5);
INSERT INTO "plug" VALUES (9);
INSERT INTO "plug" VALUES (10);
INSERT INTO "plug" VALUES (11);
INSERT INTO "plug" VALUES (15);
INSERT INTO "plug" VALUES (19);
INSERT INTO "plug" VALUES (23);
INSERT INTO "plug" VALUES (24);
INSERT INTO "plug" VALUES (28);
INSERT INTO "plug" VALUES (32);
INSERT INTO "plug" VALUES (36);
INSERT INTO "plug" VALUES (37);
INSERT INTO "plug" VALUES (41);
INSERT INTO "plug" VALUES (45);
INSERT INTO "plug" VALUES (46);
INSERT INTO "plug" VALUES (50);
INSERT INTO "plug" VALUES (54);
INSERT INTO "plug" VALUES (55);
INSERT INTO "plug" VALUES (59);
INSERT INTO "plug" VALUES (63);
INSERT INTO "plug" VALUES (64);
INSERT INTO "plug" VALUES (68);
INSERT INTO "plug" VALUES (69);
INSERT INTO "plug" VALUES (73);
INSERT INTO "plug" VALUES (77);
INSERT INTO "plug" VALUES (81);
INSERT INTO "plug" VALUES (82);
INSERT INTO "plug" VALUES (86);
INSERT INTO "plug" VALUES (90);
INSERT INTO "plug" VALUES (91);
INSERT INTO "floor" VALUES (1,1);
INSERT INTO "floor" VALUES (2,1);
INSERT INTO "floor" VALUES (3,1);
INSERT INTO "floor" VALUES (4,1);
INSERT INTO "floor" VALUES (5,2);
INSERT INTO "floor" VALUES (6,2);
INSERT INTO "floor" VALUES (7,3);
INSERT INTO "floor" VALUES (8,3);
INSERT INTO "floor" VALUES (9,3);
INSERT INTO "room" VALUES (1,1);
INSERT INTO "room" VALUES (2,1);
INSERT INTO "room" VALUES (3,1);
INSERT INTO "room" VALUES (4,1);
INSERT INTO "room" VALUES (5,2);
INSERT INTO "room" VALUES (6,2);
INSERT INTO "room" VALUES (7,3);
INSERT INTO "room" VALUES (8,3);
INSERT INTO "room" VALUES (9,4);
INSERT INTO "room" VALUES (10,5);
INSERT INTO "room" VALUES (11,5);
INSERT INTO "room" VALUES (12,5);
INSERT INTO "room" VALUES (13,6);
INSERT INTO "room" VALUES (14,6);
INSERT INTO "room" VALUES (15,7);
INSERT INTO "room" VALUES (16,7);
INSERT INTO "room" VALUES (17,7);
INSERT INTO "room" VALUES (18,8);
INSERT INTO "room" VALUES (19,8);
INSERT INTO "room" VALUES (20,9);
INSERT INTO "sensor" VALUES (1,0.0,100.0,1);
INSERT INTO "sensor" VALUES (2,0.0,40.0,1);
INSERT INTO "sensor" VALUES (3,0.0,60.0,1);
INSERT INTO "sensor" VALUES (4,0.0,100.0,1);
INSERT INTO "sensor" VALUES (5,0.0,100.0,1);
INSERT INTO "sensor" VALUES (6,0.0,100.0,2);
INSERT INTO "sensor" VALUES (7,0.0,70.0,2);
INSERT INTO "sensor" VALUES (8,0.0,60.0,2);
INSERT INTO "sensor" VALUES (9,0.0,90.0,2);
INSERT INTO "sensor" VALUES (10,0.0,20.0,2);
INSERT INTO "sensor" VALUES (11,0.0,50.0,2);
INSERT INTO "sensor" VALUES (12,0.0,100.0,3);
INSERT INTO "sensor" VALUES (13,0.0,100.0,3);
INSERT INTO "sensor" VALUES (14,0.0,90.0,3);
INSERT INTO "sensor" VALUES (15,0.0,80.0,3);
INSERT INTO "sensor" VALUES (16,0.0,60.0,4);
INSERT INTO "sensor" VALUES (17,0.0,100.0,4);
INSERT INTO "sensor" VALUES (18,0.0,100.0,4);
INSERT INTO "sensor" VALUES (19,0.0,60.0,4);
INSERT INTO "sensor" VALUES (20,0.0,100.0,5);
INSERT INTO "sensor" VALUES (21,0.0,20.0,5);
INSERT INTO "sensor" VALUES (22,0.0,100.0,5);
INSERT INTO "sensor" VALUES (23,0.0,90.0,5);
INSERT INTO "sensor" VALUES (24,0.0,50.0,5);
INSERT INTO "sensor" VALUES (25,0.0,70.0,6);
INSERT INTO "sensor" VALUES (26,0.0,50.0,6);
INSERT INTO "sensor" VALUES (27,0.0,70.0,6);
INSERT INTO "sensor" VALUES (28,0.0,70.0,6);
INSERT INTO "sensor" VALUES (29,0.0,50.0,7);
INSERT INTO "sensor" VALUES (30,0.0,100.0,7);
INSERT INTO "sensor" VALUES (31,0.0,60.0,7);
INSERT INTO "sensor" VALUES (32,0.0,80.0,7);
INSERT INTO "sensor" VALUES (33,0.0,70.0,8);
INSERT INTO "sensor" VALUES (34,0.0,80.0,8);
INSERT INTO "sensor" VALUES (35,0.0,90.0,8);
INSERT INTO "sensor" VALUES (36,0.0,90.0,8);
INSERT INTO "sensor" VALUES (37,0.0,70.0,8);
INSERT INTO "sensor" VALUES (38,0.0,60.0,9);
INSERT INTO "sensor" VALUES (39,0.0,100.0,9);
INSERT INTO "sensor" VALUES (40,0.0,100.0,9);
INSERT INTO "sensor" VALUES (41,0.0,100.0,9);
INSERT INTO "sensor" VALUES (42,0.0,90.0,10);
INSERT INTO "sensor" VALUES (43,0.0,90.0,10);
INSERT INTO "sensor" VALUES (44,0.0,90.0,10);
INSERT INTO "sensor" VALUES (45,0.0,100.0,10);
INSERT INTO "sensor" VALUES (46,0.0,100.0,10);
INSERT INTO "sensor" VALUES (47,0.0,80.0,11);
INSERT INTO "sensor" VALUES (48,0.0,80.0,11);
INSERT INTO "sensor" VALUES (49,0.0,80.0,11);
INSERT INTO "sensor" VALUES (50,0.0,30.0,11);
INSERT INTO "sensor" VALUES (51,0.0,100.0,12);
INSERT INTO "sensor" VALUES (52,0.0,100.0,12);
INSERT INTO "sensor" VALUES (53,0.0,100.0,12);
INSERT INTO "sensor" VALUES (54,0.0,50.0,12);
INSERT INTO "sensor" VALUES (55,0.0,60.0,12);
INSERT INTO "sensor" VALUES (56,0.0,100.0,13);
INSERT INTO "sensor" VALUES (57,0.0,100.0,13);
INSERT INTO "sensor" VALUES (58,0.0,100.0,13);
INSERT INTO "sensor" VALUES (59,0.0,80.0,13);
INSERT INTO "sensor" VALUES (60,0.0,70.0,14);
INSERT INTO "sensor" VALUES (61,0.0,100.0,14);
INSERT INTO "sensor" VALUES (62,0.0,100.0,14);
INSERT INTO "sensor" VALUES (63,0.0,60.0,14);
INSERT INTO "sensor" VALUES (64,0.0,100.0,14);
INSERT INTO "sensor" VALUES (65,0.0,60.0,15);
INSERT INTO "sensor" VALUES (66,0.0,100.0,15);
INSERT INTO "sensor" VALUES (67,0.0,100.0,15);
INSERT INTO "sensor" VALUES (68,0.0,90.0,15);
INSERT INTO "sensor" VALUES (69,0.0,90.0,15);
INSERT INTO "sensor" VALUES (70,0.0,80.0,16);
INSERT INTO "sensor" VALUES (71,0.0,80.0,16);
INSERT INTO "sensor" VALUES (72,0.0,100.0,16);
INSERT INTO "sensor" VALUES (73,0.0,100.0,16);
INSERT INTO "sensor" VALUES (74,0.0,90.0,17);
INSERT INTO "sensor" VALUES (75,0.0,60.0,17);
INSERT INTO "sensor" VALUES (76,0.0,50.0,17);
INSERT INTO "sensor" VALUES (77,0.0,20.0,17);
INSERT INTO "sensor" VALUES (78,0.0,100.0,18);
INSERT INTO "sensor" VALUES (79,0.0,100.0,18);
INSERT INTO "sensor" VALUES (80,0.0,100.0,18);
INSERT INTO "sensor" VALUES (81,0.0,100.0,18);
INSERT INTO "sensor" VALUES (82,0.0,60.0,18);
INSERT INTO "sensor" VALUES (83,0.0,70.0,19);
INSERT INTO "sensor" VALUES (84,0.0,100.0,19);
INSERT INTO "sensor" VALUES (85,0.0,100.0,19);
INSERT INTO "sensor" VALUES (86,0.0,60.0,19);
INSERT INTO "sensor" VALUES (87,0.0,100.0,20);
INSERT INTO "sensor" VALUES (88,0.0,100.0,20);
INSERT INTO "sensor" VALUES (89,0.0,100.0,20);
INSERT INTO "sensor" VALUES (90,0.0,40.0,20);
INSERT INTO "sensor" VALUES (91,0.0,40.0,20);
INSERT INTO "device" VALUES (1,0,1);
INSERT INTO "device" VALUES (2,0,1);
INSERT INTO "device" VALUES (3,0,1);
INSERT INTO "device" VALUES (4,0,1);
INSERT INTO "device" VALUES (5,0,1);
INSERT INTO "device" VALUES (6,0,2);
INSERT INTO "device" VALUES (7,0,2);
INSERT INTO "device" VALUES (8,0,2);
INSERT INTO "device" VALUES (9,0,2);
INSERT INTO "device" VALUES (10,0,2);
INSERT INTO "device" VALUES (11,0,2);
INSERT INTO "device" VALUES (12,0,3);
INSERT INTO "device" VALUES (13,0,3);
INSERT INTO "device" VALUES (14,0,3);
INSERT INTO "device" VALUES (15,0,3);
INSERT INTO "device" VALUES (16,0,4);
INSERT INTO "device" VALUES (17,0,4);
INSERT INTO "device" VALUES (18,0,4);
INSERT INTO "device" VALUES (19,0,4);
INSERT INTO "device" VALUES (20,0,5);
INSERT INTO "device" VALUES (21,0,5);
INSERT INTO "device" VALUES (22,0,5);
INSERT INTO "device" VALUES (23,0,5);
INSERT INTO "device" VALUES (24,0,5);
INSERT INTO "device" VALUES (25,0,6);
INSERT INTO "device" VALUES (26,0,6);
INSERT INTO "device" VALUES (27,0,6);
INSERT INTO "device" VALUES (28,0,6);
INSERT INTO "device" VALUES (29,0,7);
INSERT INTO "device" VALUES (30,0,7);
INSERT INTO "device" VALUES (31,0,7);
INSERT INTO "device" VALUES (32,0,7);
INSERT INTO "device" VALUES (33,0,8);
INSERT INTO "device" VALUES (34,0,8);
INSERT INTO "device" VALUES (35,0,8);
INSERT INTO "device" VALUES (36,0,8);
INSERT INTO "device" VALUES (37,0,8);
INSERT INTO "device" VALUES (38,0,9);
INSERT INTO "device" VALUES (39,0,9);
INSERT INTO "device" VALUES (40,0,9);
INSERT INTO "device" VALUES (41,0,9);
INSERT INTO "device" VALUES (42,0,10);
INSERT INTO "device" VALUES (43,0,10);
INSERT INTO "device" VALUES (44,0,10);
INSERT INTO "device" VALUES (45,0,10);
INSERT INTO "device" VALUES (46,0,10);
INSERT INTO "device" VALUES (47,0,11);
INSERT INTO "device" VALUES (48,0,11);
INSERT INTO "device" VALUES (49,0,11);
INSERT INTO "device" VALUES (50,0,11);
INSERT INTO "device" VALUES (51,0,12);
INSERT INTO "device" VALUES (52,0,12);
INSERT INTO "device" VALUES (53,0,12);
INSERT INTO "device" VALUES (54,0,12);
INSERT INTO "device" VALUES (55,0,12);
INSERT INTO "device" VALUES (56,0,13);
INSERT INTO "device" VALUES (57,0,13);
INSERT INTO "device" VALUES (58,0,13);
INSERT INTO "device" VALUES (59,0,13);
INSERT INTO "device" VALUES (60,0,14);
INSERT INTO "device" VALUES (61,0,14);
INSERT INTO "device" VALUES (62,0,14);
INSERT INTO "device" VALUES (63,0,14);
INSERT INTO "device" VALUES (64,0,14);
INSERT INTO "device" VALUES (65,0,15);
INSERT INTO "device" VALUES (66,0,15);
INSERT INTO "device" VALUES (67,0,15);
INSERT INTO "device" VALUES (68,0,15);
INSERT INTO "device" VALUES (69,0,15);
INSERT INTO "device" VALUES (70,0,16);
INSERT INTO "device" VALUES (71,0,16);
INSERT INTO "device" VALUES (72,0,16);
INSERT INTO "device" VALUES (73,0,16);
INSERT INTO "device" VALUES (74,0,17);
INSERT INTO "device" VALUES (75,0,17);
INSERT INTO "device" VALUES (76,0,17);
INSERT INTO "device" VALUES (77,0,17);
INSERT INTO "device" VALUES (78,0,18);
INSERT INTO "device" VALUES (79,0,18);
INSERT INTO "device" VALUES (80,0,18);
INSERT INTO "device" VALUES (81,0,18);
INSERT INTO "device" VALUES (82,0,18);
INSERT INTO "device" VALUES (83,0,19);
INSERT INTO "device" VALUES (84,0,19);
INSERT INTO "device" VALUES (85,0,19);
INSERT INTO "device" VALUES (86,0,19);
INSERT INTO "device" VALUES (87,0,20);
INSERT INTO "device" VALUES (88,0,20);
INSERT INTO "device" VALUES (89,0,20);
INSERT INTO "device" VALUES (90,0,20);
INSERT INTO "device" VALUES (91,0,20);
INSERT INTO "buildings" VALUES (1,0,38.245459,21.733246,'Δημαρχείο - Μαιζώνος 108');
INSERT INTO "buildings" VALUES (2,0,38.244078,21.732345,'Δικαστήρια - Γούναρη 30');
INSERT INTO "buildings" VALUES (3,0,38.288093,21.789753,'ΤΗΜΤΥ - Πανεπιστημιούπολη Ρίου');
COMMIT;
