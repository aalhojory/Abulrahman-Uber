const express = require('express')
const session = require('express-session');
const bodyParser= require('body-parser')
const path = require("path");
const MongoClient = require('mongodb').MongoClient
const app = express()
var sess;
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'));
  app.use(session({secret: 'nnnnyyy',saveUninitialized: true,resave: true}));
  app.use(express.static(__dirname));  
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json());

//db connection
MongoClient.connect("mongodb://localhost:27017/", {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('tinder-db')
    const ridesCollection = db.collection('rides')

  //save ride
  app.post('/save-ride', (req, res) => {
    console.log('save-ride... ') 
    var orgin = req.body.orgin
    var dest = req.body.dest
    console.log(req.body) 
    ridesCollection.insertOne({fromCoord: orgin, DetinationCoord: dest},function(err, result) {
      if (err) throw err;
      console.log("Ride inserted: " + result.insertedCount);
      res.redirect('/');
  })  
    //res.render('pick-destination.ejs', req.body)
  })
    //end save ride
  })
    
//pick-destination
app.post('/pick-destination', (req, res) => {
  console.log('pick-destination... ') 
  var cords = req.body
  console.log(req.body)   
  res.render('pick-destination.ejs', req.body)
})
//end pick-destination
  //select-driver
app.get('/start-uber', (req, res) => {
  console.log('select-driver... ')    
  res.render('select-driver.ejs', {})
})
//end select-driver
//index
app.get('/', (req, res) => {
    console.log('Hello index... ')    
    res.render('index.ejs', {})
 })
  //end index

  app.listen(8083, function() {
    console.log('listening on 8083')
  })