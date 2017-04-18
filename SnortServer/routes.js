// Defining routes for the API
// =======================================================================
var express = require('express');
var router = express.Router();          // get an instance of the express router
//SETUP MYSQL
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'snortdatabase'
});
connection.connect(function (err, connection) {
    if (err) { console.log("Error with Mysql:" + err); process.exit(1) };
})


// Router API Paths
router.get('/', function (req, res) {
    res.json({ message: 'Works! Welcome to the API!' });
})

// API for getting Collections of Rules
//Get all RulesCollections joined by their Rules
router.get('/rules', function (req, res) {
    connection.query('SELECT * FROM snortdatabase.rules_collection;',
        function (err, rows, fields) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
            } else {
                res.json({ "Error": false, "Collections": rows });
            }

        })
})
//Insert a new empty rules collection
router.post('/rules', function (req, res) {
    var query = "INSERT INTO ?? (?? , ?? , ??) VALUES (? , ? , ?)";
    var table =
        ["rules_collection", "fileName", "creationDate", "description", req.body.fileName, req.body.creationDate, req.body.description];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query!" });
        } else {
            res.json({ "Error": false, "Message": "Rule Collection Created !" });
        }
    });
})
    //Update an existing rules collection
    .put('/rules', function (req, res) {
        var query = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
        var table = ["rules_collection", "fileName", req.body.fileName, "description", req.body.description, "collection_id", req.body.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
            } else {
                res.json({ "Error": false, "Message": "Rule Collection Updated !" });
            }
        });
    })
    .delete("/rules/:collection_id", function (req, res) {
        var query = "DELETE FROM  ?? WHERE ?? = ?";
        var table = ["rules_collection", "collection_id", req.body.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
            } else {
                res.json({ "Error": false, "Message": "Deleted the collection with id = !" + req.params.collection_id });
            }
        });
    })
    //Gets the collection details corresponding to a collection by it's ID
    .get('/rules/:collection_id', function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["rules_collection", "collection_id", req.params.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": " Error executing MySQL query" })
            } else {
                res.json({ "Error": false, "Message": "Success", "Collections": rows });
            }
        })
    })
    //Gets all rules corresponding to a collection by it's ID
    .get('/collection/:collection_id', function (req, res) {
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["rule", "collection_id", req.params.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": " Error executing MySQL query" })
            } else {
                res.json({ "Error": false, "Message": "Success", "Collections": rows });
            }
        })
    })




//ROUTES FOR RULES TABLE
//Gets a rule by it's ID
router.get('/rule/:id', function (req, res) {
    var query = "SELECT * FROM ?? WHERE ?? = ?";
    var table = ["rule", "id", req.params.id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": " Error executing MySQL query" })
        } else {
            res.json({ "Error": false, "Message": "Success", "Rules": rows });
        }
    })
})
    .post('/rule', function (req, res) {
        var query = "INSERT INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
        var table =
            ["rule", "type", "sourceIP", "sourcePort", "direction", "destinationIP", "destinationPort", "content", "collection_id",
                req.body.type, req.body.sourceIP, req.body.sourcePort, req.body.direction, req.body.destinationIP, req.body.destinationPort, req.body.content, req.body.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
            } else {
                res.json({ "Error": false, "Message": "Rule added to collection " + req.body.collection_id + " !" });
            }
        });
    })
    .put('/rule/:id', function (req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["rule",
            "type", req.body.type,
            "sourceIP", req.body.sourceIP,
            "sourcePort", req.body.sourcePort,
            "direction", req.body.direction,
            "destinationIP", req.body.destinationIP,
            "destinationPort", req.body.destinationPort,
            "content", req.body.content,
            "collection_id", req.body.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
            } else {
                res.json({ "Error": false, "Message": "Rule Updated !" });
            }
        });
    })
    .delete('/rule/:id', function (req, res) {
        var query = "DELETE FROM  ?? WHERE ?? = ?";
        var table = ["rule", "id", req.body.id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
            } else {
                res.json({ "Error": false, "Message": "Deleted the rule with id = !" + req.params.id });
            }
        });
    })

module.exports = router;




