const authorize = require('../middleware/auth');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json()

router.get('/me', authorize, async (req, res) => {
	
	const user = await User.findById(req.user._id).select('-password');
	res.send(user)

});

router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var user = await User.findOne({email: req.body.email});
	if (user) return res.status(400).send('User already registered.');

	

	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		adminPrivilege: req.body.adminPrivilege,
		isGuest: false
	});
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt) 
	await user.save();

	res.send(user);

});

router.delete('/:id',[authorize, jsonParser], async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var user = await User.findOne({name: req.body.name});
	if (!user) return res.status(400).send('No User found to delete');
	 
	
	

	await User.remove({
		name: req.params.id.toString()
	})


	res.send('User successfully deleted');

});
//)
router.get('/', authorize, async (req, res) => {

	
	userCollection = await User.find()
	console.log(userCollection)

	res.send(userCollection);

});




module.exports = router;
