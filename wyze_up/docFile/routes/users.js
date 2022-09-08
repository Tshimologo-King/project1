const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("Library/databaseConnection");

router.get("/", (req, res) => {

    try {
        connection.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

//Single USER

router.get("/:id", (req, res) => {
    id = req.params.id;
    try {
        connection.query(`SELECT * FROM users WHERE users.id = ${id}`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});

//EDIT USER
router.put("/:id", middleware, (req, res) => {
    if (req.user.userType === "admin") {
        const {userName, userEmail, userPassword, subscriptionStatus} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = hash.hashSync(userPassword, salt);
        let id = req.params.id;

        try{
            connection.query(`UPDATE users SET userName="${userName}", userEmail="${userEmail}", userPassword="${userPassword}", subscriptionStatus="${subscriptionStatus}" WHERE user.id = "${id}"`,
            (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
        } 
    } else {
        res.send("Not Valid user");
    }
});

//DELETE USER
router.delete("/:id", middleware, (req, res) => {
    if (req.user.userType === "admin") {
        let id = req.params.id;
        try{
            connection.query(`DELETE FROM users WHERE users.id = "${id}"`,
            (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.send("Not a user");
    }
});

//REGISTER USER
router.post("/register", (req, res) => {
    try {
        let sql = "INSERT INTO users SET ?";
        const { userName, userEmail, userPassword, userType} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userPassword, salt);

        let user = {userName, userEmail, userPassword: hash, userType};
        connection.query(sql, user, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(` Welcome, ${(user.userName, user.userEmail)} your account has been created successfully`);
        });
    } catch (error) {
        console.log(error);
    }
});

//LOGIN
router.post("/login", (req, res) => {
    try {
        let sql = "SELECT * FROM users WHERE ?";
        let user = { userEmail: user.body.userEmail};

        connection.query(sql, user, async (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                res.send("Account Not Found. Please REGISTER");
            } else {
                const isMatch = await bcrypt.compare(req.body.userPassword, result[0].userPassword);
                if (!isMatch) {
                    res.send("Password is incorrect");
                } else {
                    const payload = {
                        user: {
                            id: result[0].id,
                            userName: result[0].userName,
                            userEmail: result[0].userEmail,
                            userType: result[0].userType,
                        },
                    };
                    jwt.sign(payload, process.env.jwtSecret, {
                        expiresIn: "365d",
                    }, (err, token) => {
                        if (err) throw err;
                        res.json({token});
                    });
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
});

//VERIFY
router.get("/user/verify", (req, res) => {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({
                msg: "UNAUTHORIZED ACCESS!",
            });
        } else {
            res.status(200);
            res.send(decodedToken);
        }
    });
});

//IMPORT MIDDLEWARE FOR AUTHENTICATION  OF USER
const middleware = require("../../middleware/authentication");
router.get("/", middleware, (req, res) => {
    try {
        let sql = "SELECT * FROM users";
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});

//FORGET + RESET PASSWORD