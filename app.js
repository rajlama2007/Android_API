require('./database/db');
const User = require('./models/User')
const Items = require('./models/products')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const multer = require('multer')



// app.use(cors());
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/images", express.static("images"))

app.post("/addUser", (req, res) => {
    var data = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });
    console.log(data);

    data.save().then(function() {
        res.send('ok')
    }).catch(function() {
        res.send('notDone');
    })
});

app.post("/getUser", (req, res) => {
    User.find({
        userName: req.body.userName,
        password: req.body.password
    }).then(function(item) {
        var user = JSON.stringify(item)
        console.log(user)
        res.send(user);
        console.log(req.body.email)
    }).catch(function(e) {
        res.send(e)
    })
});


//items crud
app.post("/addItem", (req, res) => {

    var itemName = req.body.itemName;
    var itemprice = req.body.itemPrice;
    var itemdesc = req.body.itemDescription;
    var image = req.body.itemImageName;


    var data = new Items({
        itemName: itemName,
        itemPrice: itemprice,
        itemDescription: itemdesc,
        itemImageName: image
    });
    console.log(data);

    data.save().then(function() {
        res.send('ok')
            // uploadImage.single('files');
    }).catch(function() {
        res.send('notDone');
    })
});

app.get("/getItem", (req, res) => {
    Items.find().then(function(item) {
        res.send(item);
    }).catch(function(e) {
        res.send(e)
    })
});

//inserting image
var TotalImage;
var storage = multer.diskStorage({
    destination: 'images',
    filename: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        TotalImage = file.fieldname + Date.now() + ext;
        callback(null, TotalImage);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
        return cb(newError("You can upload only image files!!!"), false);
    } else {
        cb(null, true)
    }
}

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 99999999 }
});
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(TotalImage)

    res.end(JSON.stringify({
        image: TotalImage
    }))
});

app.listen(8000);