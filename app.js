const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');



let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'public/images/upload'));
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext)
    }
})
var upload = multer({ storage: storage })

const con = require('./model/db_Connection');
let session = require('express-session');
const { query } = require('express');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

if (con) {} else {
    console.log("not Connected");
}
// registering view enginie
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded());


// cookie parser middleware
app.use(cookieParser());

// setting session and cookie
// let oneDay = 

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

//Port 
app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server started at port 3000");
});

app.use(function(req, res, next) {
    res.locals.userID = req.session.userID;
    res.locals.isAdmin = req.session.isAdmin;
    next();
});

app.get('/', (req, res) => {
    session = req.session;
    if (session.userID) {
        res.redirect("admin-search");
    } else
        res.render('index', { error: '' });

});
app.post('/signin', (req, res) => {
    if (req.body) {
        let query = `SELECT * FROM ${req.body.logintype} where userName ='${req.body.username}' and password = '${req.body.password}'`;

        console.log(query);
        con.query(query, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                session = req.session;
                session.userID = result[0].ID;
                if (req.body.logintype == 'admin') {
                    session.isAdmin = true;
                } else {
                    session.isAdmin = false;

                }
                res.redirect('admin-search');


            } else {
                res.render('index', { error: 'Username or Password Incorrect' })
            }
        })

    }

});

app.get('/admin-search', (req, res) => {
    // console.log("am hereeeeeeeeeeeeeeeeee");
    // console.log(req.session);
    session = req.session;
    if (session.userID) {
        let query = `SELECT * FROM user where ID = '${session.userID}'`;
        // console.log(query);
        con.query(query, (err, result) => {

            res.render('admin-search', { page: 'search', auth: result[0] });
        });

    } else {
        res.send("404.File does not exist");
    }
});

app.get('/admin-:userType', (req, res) => {
    // console.log(req.session);
    session = req.session;
    let userT = req.params.userType;
    console.log(req.params);
    if (userT == 'other-employee') {
        userT = "employee"
    }
    if (session.userID) {

        let query = `SELECT * FROM user where ID = '${session.userID}'`;
        // console.log("std" + query);
        let manager;
        let student;
        con.query(query, (err, result) => {
            query = `SELECT * FROM user where user_type='${userT}'`;

            con.query(query, (err, student) => {
                console.log(userT);
                res.render(`admin-${req.params.userType}`, { page: userT, auth1: result[0], std: student });

            })
        });



    } else {
        res.send("404.File does not exist");
    }
});

app.post('/deleteAccount', (req, res) => {
    session = req.session;
    if (session.userID && session.isAdmin) {
        let query = `SELECT * FROM admin where ID = '${req.session.userID}' and password = '${req.body.delete_admin_password}'`;
        // console.log("std" + query);

        con.query(query, (err, result) => {
            if (result.length > 0) {
                query = `DELETE  FROM user where ID='${req.body.to_be_delete_id}'`;
                // console.log(query);
                con.query(query, (err, result) => {
                    if (err) throw err;
                    res.redirect('admin-student');

                })

            }
        });



    } else {
        res.send("404.File does not exist");
    }
})

app.post('/viewUser', (req, res) => {
    let id = req.body.stdid;
    session = req.session;
    if (session.userID) {
        let query = `SELECT * FROM user where id = '${session.userID}'`;

        con.query(query, (err, result) => {
            if (result.length > 0) {
                query = `SELECT * FROM user where ID='${id}'`;
                con.query(query, (err, user) => {
                    query = `SELECT
                u.ID,
                DATE_FORMAT(ul.lastEntry,'%Y-%m-%d %h:%i:%S %p') as lastEntry,
                DATE_FORMAT(ul.lastExit,'%Y-%m-%d %h:%i:%S %p') as lastExit
                FROM user u
                INNER JOIN user_log ul
                ON u.ID = ul.ID
                WHERE u.ID = '${id}'
                ORDER BY ul.EID desc`;
                    con.query(query, (err, user_log) => {
                        query = `SELECT 
                    udl.ID,
                    d.deviceName,
                    udl.serialNumber,
                    DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
                    DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
                    FROM user_device_log udl
                    INNER JOIN device d
                    ON udl.serialNumber = d.serialNumber
                    WHERE udl.ID = '${id}'
                    GROUP BY serialNumber`;
                        con.query(query, (err, devices) => {
                            res.render('viewUser', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true });

                        })
                    });

                })
            }

        });





    }


})
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
})
app.post('/editProfile', (req, res) => {
    let id = req.body.stdid;
    let message = '';
    console.log("Editing " + id);
    session = req.session;
    if (session.userID) {
        let query = `SELECT * FROM user where id = '${session.userID}'`;

        con.query(query, (err, result) => {
            if (result.length > 0) {
                query = `SELECT * FROM user where ID='${id}'`;
                con.query(query, (err, user) => {
                    query = `SELECT
                u.ID,
                DATE_FORMAT(ul.lastEntry,'%Y-%m-%d %h:%i:%S %p') as lastEntry,
                DATE_FORMAT(ul.lastExit,'%Y-%m-%d %h:%i:%S %p') as lastExit
                FROM user u
                INNER JOIN user_log ul
                ON u.ID = ul.ID
                WHERE u.ID = '${id}'
                ORDER BY ul.EID desc`;
                    con.query(query, (err, user_log) => {
                        query = `SELECT 
                    udl.ID,
                    d.deviceName,
                    udl.serialNumber,
                    DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
                    DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
                    FROM user_device_log udl
                    INNER JOIN device d
                    ON udl.serialNumber = d.serialNumber
                    WHERE udl.ID = '${id}'
                    GROUP BY serialNumber`;
                        con.query(query, (err, devices) => {
                            // console.log(user);
                            res.render('edit-profile', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });

                        })
                    });

                })
            }

        });

    }


})
app.post('/editUser', upload.single('user-img'), urlencodedParser, [
    check(['id', 'firstName', 'lastName', 'gender', 'level', 'type'], 'Field Can not be empty')
    .trim()
    .isLength({ min: 1 })
], (req, res, next) => {
    let { id, firstName, lastName, gender, level, type } = req.body;
    const file = req.file
    const allowedExt = ['.jpg', '.jpeg', '.png'];
    let query = '';
    let message = '';
    let imgUrl = '';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        let error = errors.array();
        console.log("first", error)
        message = `<div class='alert alert-danger'
        role='alert'> ${error[0].msg} </div>`;
    }
    if (file) {
        let ext = path.extname(file.originalname);
        if (allowedExt.indexOf(ext) !== -1) {
            imgUrl = req.file.filename;
        } else {
            message = "<div class='alert alert-danger' role='alert'>File type not allowed</div>"
        }
    }
    console.log("**********88-");
    console.log(req.body.id);
    console.log("-------------------");
    if (imgUrl == '') {
        imgUrl = "profile.png";
    }
    query = `UPDATE user
    SET firstName = '${req.body.firstName.toLowerCase()}',
    lastName = '${req.body.lastName.toLowerCase()}',
    gender = '${req.body.gender.toLowerCase()}',
    user_level = '${req.body.level.toLowerCase()}',
    user_type = '${req.body.type.toLowerCase()}',
    imgUrl = '${imgUrl}',
    ID = '${req.body.id.toLowerCase()}'
    WHERE ID = '${req.body.id.toLowerCase()}'
    `;


    con.query(query, (err, result) => {
        if (err) throw err;
        message = "<div class='alert alert-success' role='alert'>Profile successfully Updated.</div>";

    });
    session = req.session;

    query = `SELECT * FROM user where ID = '${session.userID}'`;

    con.query(query, (err, result) => {
        if (result.length > 0) {
            query = `SELECT * FROM user where ID='${id}'`;
            con.query(query, (err, user) => {
                query = `SELECT
                u.ID,
                DATE_FORMAT(ul.lastEntry,'%Y-%m-%d %h:%i:%S %p') as lastEntry,
                DATE_FORMAT(ul.lastExit,'%Y-%m-%d %h:%i:%S %p') as lastExit
                FROM user u
                INNER JOIN user_log ul
                ON u.ID = ul.ID
                WHERE u.ID = '${id}'
                ORDER BY ul.EID desc`;
                con.query(query, (err, user_log) => {
                    query = `SELECT 
                    udl.ID,
                    d.deviceName,
                    udl.serialNumber,
                    DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
                    DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
                    FROM user_device_log udl
                    INNER JOIN device d
                    ON udl.serialNumber = d.serialNumber
                    WHERE udl.ID = '${id}'
                    GROUP BY serialNumber`;
                    con.query(query, (err, devices) => {
                        res.render('edit-profile', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });

                    })
                });

            })
        }

    });

});

// edit device

app.post('/editDevice', [
    check(['deviceName', 'deviceSerial', 'orginalSerial'], 'Field Can not be empty')
    .trim()
    .isLength({ min: 1 })
], (req, res) => {
    console.log("am in 1")
    let { id, deviceName, deviceSerial, orginalSerial } = req.body;
    console.log(req.body);
    id = id.toLowerCase();
    deviceName = deviceName.toLowerCase();
    deviceSerial = deviceSerial.toLowerCase();
    orginalSerial = orginalSerial.toLowerCase();
    let message = '';

    session = req.session;
    if (session.userID) {
        let query = `SELECT * FROM user where ID = '${session.userID}'`;

        con.query(query, (err, result) => {
            if (result.length > 0) {
                query = `SELECT * FROM user where ID='${id}'`;
                con.query(query, (err, user) => {
                    query = `SELECT
                u.ID,
                DATE_FORMAT(ul.lastEntry,'%Y-%m-%d %h:%i:%S %p') as lastEntry,
                DATE_FORMAT(ul.lastExit,'%Y-%m-%d %h:%i:%S %p') as lastExit
                FROM user u
                INNER JOIN user_log ul
                ON u.ID = ul.ID
                WHERE u.ID = '${id}'
                ORDER BY ul.EID desc`;
                    con.query(query, (err, user_log) => {
                        query = `SELECT 
                    udl.ID,
                    d.deviceName,
                    udl.serialNumber,
                    DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
                    DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
                    FROM user_device_log udl
                    INNER JOIN device d
                    ON udl.serialNumber = d.serialNumber
                    WHERE udl.ID = '${id}'
                    GROUP BY serialNumber`;
                        con.query(query, (err, devices) => {


                            const errors = validationResult(req);
                            if (!errors.isEmpty()) {
                                console.log(errors);
                                let error = errors.array();
                                console.log("first", error)
                                message = `<div class='alert alert-danger'
                                role='alert'> ${error[0].msg} </div>`;
                                res.render('edit-profile', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });
                            } else {
                                let query = `SELECT * FROM device
                                Where serialNumber = '${deviceSerial}}'`;

                                con.query(query, (err, selectDevices) => {
                                    console.log("DEVICES WITH NAME: " + selectDevices);
                                    if (selectDevices.length == 0) {
                                        query = `
                                        UPDATE device set
                                            serialNumber = '${deviceSerial}',
                                            deviceName = '${deviceName}'
                                      where serialNumber = '${orginalSerial}'
                                        `;
                                        con.query(query, (err, updateResult) => {
                                            if (err) throw err;
                                            message = "<div class='alert alert-success' role='alert'>Device Updated Succesfully</div>";
                                            query = `SELECT 
                                            udl.ID,
                                            d.deviceName,
                                            udl.serialNumber,
                                            DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
                                            DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
                                            FROM user_device_log udl
                                            INNER JOIN device d
                                            ON udl.serialNumber = d.serialNumber
                                            WHERE udl.ID = '${id}'
                                            GROUP BY serialNumber`;
                                            con.query(query, (err, devices) => {


                                                res.render('edit-profile', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });
                                            });
                                        })


                                    } else {
                                        if (deviceSerial != orginalSerial) {
                                            message = "<div class='alert alert-danger' role='alert'>Device with the given serial number is already registered</div>";

                                            res.render('edit-profile', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });

                                        } else {

                                            query = `
                                        UPDATE device set
                                            serialNumber = '${deviceSerial}',
                                            deviceName = '${deviceName}'
                                      where serialNumber = '${orginalSerial}'
                                        `;
                                            con.query(query, (err, updateResult) => {
                                                if (err) throw err;
                                                message = "<div class='alert alert-success' role='alert'>Device Updated Succesfully</div>";
                                                query = `SELECT 
                                                udl.ID,
                                                d.deviceName,
                                                udl.serialNumber,
                                                DATE_FORMAT(MAX(udl.entryDate),'%Y-%m-%d %h:%i %p') as lastEntry,
                                                DATE_FORMAT(MAX(udl.exitDate),'%Y-%m-%d %h:%i %p') as lastExit
                                                FROM user_device_log udl
                                                INNER JOIN device d
                                                ON udl.serialNumber = d.serialNumber
                                                WHERE udl.ID = '${id}'
                                                GROUP BY serialNumber`;
                                                con.query(query, (err, devices) => {


                                                    res.render('edit-profile', { page: 'student', auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });
                                                });


                                            });
                                        }
                                    }
                                })
                            }

                        })
                    });

                })
            }

        });

    }


})

// live search

app.post('/searchUser', urlencodedParser, (req, res) => {
    let val = req.body.value;
    let value = val.split('_');
    let isBarcode = value[1];
    let str = value[0];
    let response = "";

    // console.log(value);
    // console.log(isBarcode);

    // if it is not a barcode
    if (isBarcode == 'false') {
        console.log('here')
        let query = `SELECT * FROM user where ID like '${str}%'`;
        // console.log(query)
        con.query(query, (err, result) => {
            if (err) throw err;
            // console.log(result);
            result.forEach((row) => {
                response += `<form action='viewUser' method='post'>
                <input name='stdid' class='hidden-input' value='${row['ID']}'>
                <input type='submit' class='search-entries' value='${row['ID']}'>
            </form>`
            })
            res.send(response);
        })

    }

})

app.post('/tableSearch', urlencodedParser, (req, res) => {
    // console.log(req.body);


    let type = req.body.type;
    let userType = req.body.userType;
    let value = req.body.value;
    let sortBy = req.body.sortBy;
    let sortType = req.body.sortType;
    let isAcc = req.body.isAcc;
    // check search type
    let condition = value + '%';
    let content = "";

    if (!isAcc) {

        let query = `SELECT * FROM user where lower(${type}) like '${condition}' and user_type = '${userType}' ORDER BY ${sortBy} ${sortType}`;
        console.log(query);

        con.query(query, (err, result) => {

            result.forEach((std) => {



                content += `
				<ul class='list-content'>
					<li><img src='../images/upload/${std['imgUrl']}' alt='profile'></li>
					<li class='user-name'>
                    ${std['firstName']} ${std['lastName']}
					</li>
					<li class='user-id '>
                    ${std['ID']}
					</li>
					<li class='user-gender '>
                    ${std['gender']}
					</li>
					<li class='user-level '>
                    ${std['user_level']}
					</li>
					<li class='actions '>
															<img src='../images/sidemore.png ' alt='menu ' id='three-dots-${std[ 'ID']}' onmouseover='openmenu(this.id) '>
												<div class='menu-choice ' id='form-${std['ID']}' onmouseleave='closemenu(this.id)'>
												<form class='choice1 ' action='viewUser' method='post'>
													<input class='dot-menu-hidden' type='text' name='stdid' value=${std[ 'ID']} >
													<input type='submit' name='view' value='View profile'>
												</form>
												<form action='editProfile' method='post' class='choice1 '>
													<input class='dot-menu-hidden' type='text' name='stdid' value=${std[ 'ID']} >
													<input type='submit' name='edit' value='Edit profile'>
												</form>
												<form action='deleteAccount' method='post' class='choice1 '>
												<input class='dot-menu-hidden' type='text' name='stdid' value=${std[ 'ID']} >
												<input type='submit' name='delete' value='Delete profile'>
											</form>


											</div>

											</li>
				</ul>
				
				  `;

            });
            res.send(content);
        });


    } else {
        let query = `SELECT 
        u.ID,
            u.imgUrl,
            u.firstName,
            u.lastName,
            e.userName,
            DATE_FORMAT(e.lastLogin,'%Y-%m-%d %h:%i:%S %p') as lastLogin
        FROM employee e
        INNER JOIN user u
        ON u.ID = e.ID
        where u.${type} like '${condition}'
        and u.user_type = '${userType}'
        ORDER BY ${sortBy} ${sortType} `;


        con.query(query, (err, result) => {
            if (err) throw err;
            result.forEach((std) => {

                content += `
				<ul class='list-content'>
					<li><img src='../images/upload/${std['imgUrl']}' alt='profile'></li>
					<li class='user-name'>
                    ${std['firstName']} ${std['lastName']}
					</li>
					<li class='user-id'>
                    ${std['ID']}
					</li>
					<li class='userName'>
                    ${std['userName']}
					</li>
					<li class='lastLogin'>
                    ${std['lastLogin']}
					</li>
					<li class='actions '>
															<img src='../images/sidemore.png ' alt='menu ' id='three-dots-${std[ 'ID']}' onmouseover='openmenu(this.id) '>
												<div class='menu-choice ' id='form-${std[ 'ID']}' onmouseleave='closemenu(this.id) '>
												<form class='choice1 ' action='viewUser' method='post'>
													<input class='dot-menu-hidden' type='text' name='stdid' value=${std[ 'ID']} >
													<input type='submit' name='view' value='View profile'>
												</form>
												<form action='editProfile' method='post' class='choice1 '>
													<input class='dot-menu-hidden' type='text' name='stdid' value=${std[ 'ID']} >
													<input type='submit' name='edit' value='Edit profile'>
												</form>
												<form action='deleteAccount' method='post' class='choice1 '>
												<input class='dot-menu-hidden' type='text' name='stdid' value=${std[ 'ID']} >
												<input type='submit' name='delete' value='Delete profile'>
											</form>


											</div>

											</li>
				</ul>
				`;
            })
            res.send(content);
        })
    }
});

// add user
app.get('/addUser-:page', (req, res) => {

    session = req.session;
    if (session.userID) {
        let query = `SELECT * FROM user where ID = '${session.userID}'`;
        // console.log(query);
        con.query(query, (err, result) => {

            res.render('admin-add-student', { page: req.params.page, auth1: result[0], message: '' });
        });

    } else {
        res.send("404.File does not exist");
    }

})

app.post('/saveUser', upload.single('user_img'), urlencodedParser, [
    check(['user_id', 'user_firstName', 'user_lastName', 'user_gender', 'user_level', 'user_type'], 'Field Can not be empty')
    .trim()
    .isLength({ min: 1 })
    .toLowerCase()
], (req, res, next) => {
    let { user_id, user_firstName, user_lastName, user_gender, user_level, user_type } = req.body;
    const file = req.file
    const allowedExt = ['.jpg', '.jpeg', '.png'];
    let query = '';
    let message = '';
    let imgUrl = '';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        let error = errors.array();
        console.log("first", error)
        message = `<div class='alert alert-danger'
        role='alert'> ${error[0].msg} </div>`;
    }
    if (file) {
        let ext = path.extname(file.originalname);
        if (allowedExt.indexOf(ext) !== -1) {
            imgUrl = req.file.filename;
        } else {
            message = "<div class='alert alert-danger' role='alert'>File type not allowed</div>"
        }
    }

    if (imgUrl == '') {
        imgUrl = "profile.png";
    }

    query = `SELECT ID FROM user WHERE ID = '${user_id}'`;

    if (message == '') {

        con.query(query, (err, result) => {
            if (result.length > 0) {
                message = "<div class='alert alert-danger' role='alert'>User already registered</div>"
            } else {
                query = ` INSERT INTO user
            (ID,
            firstName,
            lastName,
            gender,
            user_level,
            user_type,
            imgUrl) VALUES('${user_id}','${user_firstName}','${user_lastName}','${user_gender}','${user_level}','${user_type}','${imgUrl}')`;


                con.query(query, (err, result) => {
                    if (err) throw err;
                    message = "<div class='alert alert-success' role='alert'>User registered successfully</div>";

                });
            }
        })
    }



    session = req.session;
    let id = session.userID;
    query = `
            SELECT * FROM user where ID = '${session.userID}'
            `;

    con.query(query, (err, result) => {
        if (result.length > 0) {
            query = `
            SELECT * FROM user where ID = '${id}'
            `;
            con.query(query, (err, user) => {
                query = `
            SELECT
            u.ID,
                DATE_FORMAT(ul.lastEntry, '%Y-%m-%d %h:%i:%S %p') as lastEntry,
                DATE_FORMAT(ul.lastExit, '%Y-%m-%d %h:%i:%S %p') as lastExit
            FROM user u
            INNER JOIN user_log ul
            ON u.ID = ul.ID
            WHERE u.ID = '${id}'
            ORDER BY ul.EID desc `;
                con.query(query, (err, user_log) => {
                    query = `
            SELECT
            udl.ID,
                d.deviceName,
                udl.serialNumber,
                DATE_FORMAT(MAX(udl.entryDate), '%Y-%m-%d %h:%i %p') as lastEntry,
                DATE_FORMAT(MAX(udl.exitDate), '%Y-%m-%d %h:%i %p') as lastExit
            FROM user_device_log udl
            INNER JOIN device d
            ON udl.serialNumber = d.serialNumber
            WHERE udl.ID = '${id}'
            GROUP BY serialNumber `;
                    con.query(query, (err, devices) => {
                        res.render('admin-add-student', { page: `${user_type}`, auth1: result[0], user: user, userlog: user_log, devices: devices, isAdmin: true, message: message });

                    })
                });

            })
        }

    });

})

app.get('/manageAccount', (req, res) => {
    session = req.session;


    if (session.userID) {

        let query = `SELECT * FROM user where ID = '${session.userID}'`;
        // console.log("std" + query);
        let manager;
        let student;
        con.query(query, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {

                query = `SELECT 
			u.firstName,u.lastName,u.ID,u.imgUrl,
			e.userName,DATE_FORMAT(e.lastLogin,'%Y-%m-%d %h:%i:%S %p') as lastLogin
		 FROM employee e
				  INNER JOIN user u
				  on u.ID = e.ID
			 `;
                con.query(query, (err, account) => {

                    res.render(`admin-account-manage-account`, { page: 'account', auth1: result[0], accounts: account });

                })
            }
        });



    } else {
        res.send("404.File does not exist");
    }
})
app.post('/createAccount', urlencodedParser, [
    check(['ID', 'userName', 'password', 'repassword'], 'Password length must be between 8 and 20 characters')
    .trim()
    .isLength({ min: 8, max: 20 })
], (req, res, next) => {
    let { ID, userName, password, repassword } = req.body;
    let session = req.session;
    let query;
    let message = "";
    console.log(req.body);
    if (session.isAdmin && session.userID) {
        query = `SELECT * FROM user where ID='${session.userID}'`;
        con.query(query, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                // check if user exists with that id
                query = `SELECT ID FROM user where ID ='${ID}'`;
                con.query(query, (err, checkUser) => {
                    if (err) throw err;
                    console.log(query);
                    console.log("checking user:");
                    console.log(checkUser);
                    if (checkUser.length == 1) {
                        // checkif there is an account with that id
                        query = `SELECT ID from employee where ID = '${ID}'`;
                        con.query(query, (err, checkAcc) => {
                            if (err) throw err;
                            if (checkAcc.length == 0) {
                                // check if username already taken
                                query = `SELECT userName from employee where userName = '${userName}'`;
                                con.query(query, async(err, checkUsername) => {
                                    if (err) throw err;
                                    if (checkUsername.length == 0) {

                                        let pass = '';
                                        // generate salt to hash password
                                        // now we set user password to hashed password

                                        const salt = await bcrypt.genSalt(10);
                                        pass = await bcrypt.hash(password, salt);

                                        // create Account
                                        query = `INSERT INTO employee values ('${userName}','${pass}','${ID}','')`;

                                        con.query(query, (err, created) => {
                                            if (err) throw err;
                                            console.log("Account Created");
                                            message = `<div class='good' id='show-submit-status'>
								
                                            <p>Account Created Successfully</p>
                        
                                            </div>_good`;
                                            res.send(message);
                                        })
                                    } else {
                                        message = "<div class='alert alert-danger' role='alert'>Username already taken.</div>_bad";
                                        res.send(message);
                                    }
                                })

                            } else {
                                message = "<div class='alert alert-danger' role='alert'>User aleady have an account.</div>_bad"
                                res.send(message);
                            }
                        })
                    } else {
                        message = "<div class='alert alert-danger' role='alert'>User with the given id does not exist.</div>_bad"
                        res.send(message);
                    }
                })

            } else {
                // res.status(404).send("page doesnt exist,no session");
            }
        })
    }

});
app.post('/deleteUserAccount', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})