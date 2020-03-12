const config = require('config')
const cookieParser = require('cookie-parser')
const authorize = require('./middleware/auth')
const helmet = require('helmet')
const compression = require('compression')
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');

 const gallery = require('./routes/images')
 var path = require('path');
 var mongoDB ='mongodb://dvcuser:Fury3443@ds115244.mlab.com:15244/dvc'
const app = express();
app.use(helmet());
app.use(compression());



mongoose.connect(mongoDB,{ useNewUrlParser: true}
	)
.then(() => console.log('Connected to MongoDB...'))
.catch(err=> console.error('Could not connect to MongoDB'));


app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', users);

app.use('/api/auth', auth);

app.use('/api/images', gallery)


app.get('/', (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "index.html"));

});

app.get('/register', (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "registration.html"));

});




app.get('/login', (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "login.html"));

});



app.get('/edit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "edit.html"));

});







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


