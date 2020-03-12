const {Spotlight} = require('../models/spotlightModel');
const {Image} = require('../models/imageModel');
const authorize = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const readChunk = require('read-chunk')
const fileType = require('file-type')
const formidable = require('formidable')
const path = require('path')

const {User, validate} = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const fs = require('fs');

const app = express();
var currentFolder = '';


var jsonParser = bodyParser.json()



router.post('/spotlight', authorize, async (req, res) =>{
   
    const user = await User.findById(req.user._id).select('-password');
	var photos = []
        form = new formidable.IncomingForm();

        console.log(req.user._id + '.jpg')
         var spotlight = await Spotlight.findOne({$or: [{ImageName: req.user._id + '.jpg'},{ImageName: req.user._id + '.png'},{ImageName: req.user._id + '.jpeg'}]})
         if (spotlight == null){
            spotlight = new Spotlight({
            Title: 'test',
            Description: 'test',
            DVC: false,
            ImageName: 'test',
            img: 'test',
            
    });
            

         }
         image = new Image({
                imgID: 'test',
                img: 'test',
            });
        
        console.log('ImageName:',spotlight.ImageName)
      
        spotlight.Title = 'test'
        spotlight.DVC = false
        spotlight.Description = 'test'


        
       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        



        if(name == "Title:"){
            spotlight.Title = value;
            console.log('has the name', name)

        }
        else if (name == "Description:"){
            spotlight.Description = value;
        }
        else if (name == "DVC:")
            spotlight.DVC = value
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
     	console.log('updated spotlightTitle:', spotlight.Title)
        console.log('updated spotlightDescription:', spotlight.Description)
        console.log("name of file form:",name)
		var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = req.user._id +'.' + type.ext;
            spotlight.ImageName = filename
            spotlight.ImageName = spotlight.ImageName.toString()
            spotlight.img.data = fs.readFileSync(file.path)
            spotlight.img.contentType = 'image/' +type.ext
            image.imgID = filename.toString();
            image.img.data = spotlight.img.data
            console.log(spotlight.img.data)
            image.img.contentType = 'image/' +type.ext

            console.log('filename', spotlight.ImageName)
            
            fs.rename(file.path,'public/images/home/spotlight/'+filename, (err)=>{
            	if (err) throw err;
            	console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/home/spotlight'
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }

         await spotlight.save();
         
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);


    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        res.send('You have successfully posted!')
        
    });
    form.parse(req, function (err, fields, files) {
        console.log('parsed!')
    });


 });


router.get('/spotlight', async (req, res) =>{

     
    
     var spotlight = await Spotlight.find()
     for(i=0;i<=spotlight.length-1;i++){

        binaryImage = Buffer(spotlight[i].img.data, 'binary').toString('base64')
        spotlight[i].ImageName = binaryImage
     }

 
   
    // awesome = Buffer(spotlight.img.data, 'binary').toString('base64')
    //  spotlight.ImageName = awesome


res.send(spotlight)

});

router.get('/spotlightSingle', authorize, async (req, res) =>{

     
    
     var spotlight = await Spotlight.findOne({$or: [{ImageName: req.user._id + '.jpg'},{ImageName: req.user._id + '.png'},{ImageName: req.user._id + '.jpeg'}]})
     

res.send(spotlight)

});



module.exports = router;
