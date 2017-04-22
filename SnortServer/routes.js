// Defining routes for the API
// =======================================================================
var express = require('express');
var router = express.Router();          // get an instance of the express router

//Declare uploader
var multer = require('multer');
var fs = require('fs');
var path = require('path');
// Declare CSV Reader
var readCSV = require('nodecsv').readCSV;

// Declare the multer storage for uploading and renaming the files
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        console.log("Naming the file: " + file.originalname + "...");
        cb(null, file.originalname + '-' + Date.now() + '.csv')
    },
})


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

//  API for getting Collections of Rules
//  Get all RulesCollections joined by their Rules
router.get('/rules', function (req, res) {
    connection.query('SELECT * FROM snortdatabase.rules_collection;',
        function (err, rows, fields) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
                console.log("Error !" + err);
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
            console.log("Error !" + err);
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
                console.log("Error !" + err);
            } else {
                res.json({ "Error": false, "Message": "Rule Collection Updated !" });
            }
        });
    })
    .delete("/rules/:collection_id", function (req, res) {
        var query = "DELETE FROM  ?? WHERE ?? = ?";
        var table = ["rules_collection", "collection_id", req.params.collection_id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
                console.log("Error !" + err);
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
                console.log("Error !" + err);
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
                console.log("Error !" + err);
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
            console.log("Error !" + err);
        } else {
            res.json({ "Error": false, "Message": "Success", "Rules": rows });
        }
    })
})
    .post('/rule', function (req, res) {
        var query = "INSERT INTO ?? (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
        var table =
            ["rule", "type", "sourceIP", "sourcePort", "direction", "destinationIP", "destinationPort", "content", "collection_id", "protocol",
                req.body.type, req.body.sourceIP, req.body.sourcePort, req.body.direction, req.body.destinationIP, req.body.destinationPort, req.body.content, req.body.collection_id, req.body.protocol];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
                console.log("Error !" + err);
            } else {
                res.json({ "Error": false, "Message": "Rule added to collection " + req.body.collection_id + " !" });
            }
        });
    })
    .put('/rule/:id', function (req, res) {
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["rule",
            "type", req.body.type,
            "protocol", req.body.protocol,
            "sourceIP", req.body.sourceIP,
            "sourcePort", req.body.sourcePort,
            "direction", req.body.direction,
            "destinationIP", req.body.destinationIP,
            "destinationPort", req.body.destinationPort,
            "content", req.body.content,
            "id", req.body.id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
                console.log("Error !" + err);
            } else {
                res.json({ "Error": false, "Message": "Rule Updated !" });
            }
        });
    })
    .delete('/rule/:id', function (req, res) {
        var query = "DELETE FROM  ?? WHERE ?? = ?";
        var table = ["rule", "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query!" });
                console.log("Error !" + err);
            } else {
                res.json({ "Error": false, "Message": "Deleted the rule with id = " + req.params.id });
            }
        });
    })



//   File upload routeupload.single('CSVFILE')
router.get('/upload', function (req, res) {
    res.end('Just a simple NG2 File Uploader Endpoint');
})
    .post('/upload', function (req, res) {
        console.log('Arrived at uploading!');
        var upload = multer({
            storage: storage,
            fileFilter: function (req, file, callback) {
                var ext = path.extname(file.originalname);
                if (ext !== '.csv') {
                    return callback(new Error('Only csv file allowed!'), false);
                }
                callback(null, true)
            }
        }).single('CSVFILE')
        upload(req, res, function (err) {
            if (err) {
                console.log("File Not Uploaded ! Error:", err.toString());
                return res.json(err.toString());
            }
            console.log("Uploaded! File Path:", req.file.path);
            ProcessFile(req.file.path, req.file.originalname);
            res.json({ "uploaded_file": req.file });
        })
    });

function ProcessFile(csvFilePath, originalFileName) {
    readCSV(csvFilePath, function (error, data) {
        //The callback returns an error or the readed data :)
        if (error) {
            console.log("File could not be processed!", err);
            return;
        }
        //Get corresponding column id's to parse
        indicatorTitleColumnId = data[0].findIndex((col) => col == 'indicator_title')
        sourceColumnId = data[0].findIndex((col) => col == 'value')

        if (indicatorTitleColumnId == -1 || sourceColumnId == -1) {
            console.log("Invalid .CSV Snort Format !");
            return;
        }
        // Now process the obtained info from the CSV file
        var rulesList = [];
        for (i = 1; i < data.length; i++) {
            if (!(data[i][sourceColumnId] == null || data[i][indicatorTitleColumnId] == null))
                rulesList.push({ "source": data[i][sourceColumnId], "indicator": data[i][indicatorTitleColumnId] })
        }
        newDBRulesCollection(originalFileName, rulesList);
    });
}

function newDBRulesCollection(collectionName, rulesList) {
    //Create new rule collection in the database:
    var date = new Date().toLocaleDateString("en-US");
    var query = "INSERT INTO ?? (?? , ?? , ??) VALUES (? , STR_TO_DATE(?,'%m/%d/%Y') , ?)";
    var table =
        ["rules_collection", "fileName", "creationDate", "description", collectionName, date, "Edit this description!"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            console.log("Error !" + err);
        } else {
            console.log("Rule Collection Created ! ", collectionName);
            insertRulesInCollectionIdByName(collectionName, rulesList);
        }
    });
}
function insertRulesInCollectionIdByName(collectionName, rulesList) {
    var query = "SELECT * FROM ?? WHERE ?? = ?";
    var table = ["rules_collection", "fileName", collectionName];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            console.log("Could not get collection id by name ! Error :" + err);
        } else {
            console.log("Collection " + collectionName + " has id " + rows[0].collection_id);
            idOfCollectionCreated = rows[0].collection_id;
            if (idOfCollectionCreated != -1) {
                for (i = 0; i < rulesList.length; i++) {
                    insertRuleInDBCollection(idOfCollectionCreated, rulesList[i]);
                }
            }
        }
    });
}
function insertRuleInDBCollection(collection_id, ruleToInsert) {
    var query = "INSERT INTO ?? (??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
    var table =
        ["rule", "type", "sourceIP", "sourcePort", "direction", "destinationIP", "destinationPort", "content", "collection_id", "protocol",
            0, ruleToInsert.source, "any", 0, "any", "any", ruleToInsert.indicator, collection_id, 0];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            console.log("Error !" + err);
        } else {
            console.log("Added rule to collection " + collection_id + " # " + ruleToInsert.source);
        }
    });
}
module.exports = router;




