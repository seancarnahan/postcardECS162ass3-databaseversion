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

//create a route -> dont use this method becuase then you have to make a route for everything
// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname, 'public', 'sean-carnahan-creator.html')); //__dirname -> get current directory
// });


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

app.post('/send', (req,res) => {

  fs.writeFileSync('postcardData.json', JSON.stringify(req.body));
});

//send different url based off post
app.get('/display', (req, res) => {
  res.writeHead(200, {'Content-type': 'text/html'});
  fs.readFile('./public/sean-carnahan-display.html', null, function(error, data) {
    res.write(data);
    res.end();
  });
});

// app.get("/display", (req, res) => {
//
//     res.status(301).redirect("./public/sean-carnahan-display.html")
//
// })

//send postcardData back to the browser
app.get('/getJsonData', (req, res) => {
  //res.writeHead(200, {'Content-type': 'application/json'});
  fs.readFile('./postcardData.json', null, function(error, data) {
    res.send(JSON.parse(data));
    res.end();
  });

});


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


//
// app.post('/upload', (req, res) => {
//   console.log("UPLOADING IMAGE....");
// });














/*
// const express = require('express');
// const app = express();
const assets = require('./assets');

// Multer is a module to read and handle FormData objects, on the server side
const multer = require('multer');

// Make a "storage" object that explains to multer where to store the images...in /images
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')
  },
  // keep the file's original name
  // the default behavior is to make up a random string
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Use that storage object we just made to make a multer object that knows how to
// parse FormData objects and store the files they contain
let uploadMulter = multer({storage: storage});

// First, server any static file requests
app.use(express.static('public'));

// Next, serve any images out of the /images directory
app.use("/images",express.static('images'));

// Next, serve images out of /assets (we don't need this, but we might in the future)
app.use("/assets", assets);

// Next, if no path is given, assume we will look at the postcard creation page
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });

// Next, handle post request to upload an image
// by calling the "single" method of the object uploadMulter that we made above
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
*/


// listen for HTTP requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
