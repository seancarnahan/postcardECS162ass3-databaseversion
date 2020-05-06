const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path'); //used to handle paths and urls
const multer = require('multer');


//nodemon is a dev dependency that watches the server for you so you dont have to constantly reload
const express = require('express');
const router = express.Router();


const app = express();
const PORT = process.env.PORT || 5000;

//database
const sql = require("sqlite3").verbose();
const postcardsDB = new sql.Database("postcards.db");//interface to the file

let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='PostCardTable' ";
postcardsDB.get(cmd, function (err, val) {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file - creating one");
        createPostcardsDB();
    } else {
        console.log("Database file found");
    }
});


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function createPostcardsDB() {
  const cmd = 'CREATE TABLE PostCardTable ( rowID INTEGER PRIMARY KEY, photo TEXT, message TEXT, font TEXT, color TEXT, randomStr TEXT )';
  postcardsDB.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}





















/* SET STATIC FOLDER */
//.use is used to express middleware
app.use (
  express.static(
      path.resolve(__dirname, 'public'),
      {index: 'sean-carnahan-creator.html'}
  )
);

app.listen(PORT, () => {
  console.log('Server started on port: ' + PORT);
});

app.use(express.json());

app.post('/send', (req,res,next) => {

  let randomStr = makeid(22);
  let photo = req.body.photo;
  let message = req.body.message;
  let font = req.body.font;
  let color = req.body.color;

  //put new row into DB
  cmd = "INSERT INTO PostCardTable (photo, message, font, color, randomStr ) VALUES (?,?,?,?,?) ";
  postcardsDB.run(cmd,photo,message,font,color,randomStr, function(err) {
    if (err) {
      console.log("DB insert error",err.message);
      next();
    } else {
      let newId = this.lastID; // the rowid of last inserted item
      //res.send("Got new item, inserted with rowID: "+newId);
      res.send(randomStr);
    }
  });
});


//send different url based off post
app.get('/display.html', (req, res) => {
  res.writeHead(200, {'Content-type': 'text/html'});
  fs.readFile('./public/sean-carnahan-display.html', null, function(error, data) {
    res.write(data);

    res.end();
  });
});



//send postcardData back to display
app.get('/getJsonData', handleJSONData);



function handleJSONData(req, res, next) {
  console.log("query params:", req.query.id);
  let randomString = req.query.id;

  let cmd = "SELECT * FROM PostCardTable WHERE randomStr = ?";

  postcardsDB.all(cmd, randomString, function (err, rows) {
    if (err) {
      console.log("Database reading error", err.message)
      next();
    } else {
      res.json(rows);
      console.log("rows",rows);
    }
  });
}












/*---START OF TEACHER CODE ----*/



let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')
  },
  // keep the file's original name
  // the default behavior is to make up a random string
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

let uploadMulter = multer({storage: storage});

app.use("/images",express.static('images'));

app.post('/upload', uploadMulter.single('newImage'), function (request, response) {
  // file is automatically stored in /images
  // WARNING!  Even though Glitch is storing the file, it won't show up
  // when you look at the /images directory when browsing your project
  // until later.  So sorry.
  console.log("Recieved",request.file.originalname,request.file.size,"bytes")
  // the file object "request.file" is truthy if the file exists
  if(request.file) {
    // Always send HTTP response back to the browser.  In this case it's just a quick note.
    response.end("Server recieved "+request.file.originalname);
  }
  else throw 'error';
})
