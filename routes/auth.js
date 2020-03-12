const cookie = require('cookie-parser')
const authorize = require('../middleware/auth')
const {User} = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var user = await User.findOne({name: req.body.name});         
	if (!user) return res.status(400).send('Invalid Username or password');

	var validPassword = await bcrypt.compare(req.body.password, user.password)
	
	 if (!validPassword) return res.status(400).send('Invalid Username or password');
	 console.log('hey')
	const token = user.generateAuthToken();
	const cookieOptions = {
		httpOnly: true,
		expires: 0
	}

	res.cookie('xauthtoken', token, cookieOptions)

	res.send(token);

});



router.get('/logout', authorize, async(req,res) => {
	console.log('succesfully logged out')
	res.clearCookie('xauthtoken')
	res.redirect('/login')


});






function validate(req){
	const schema = {
		name: Joi.string().alphanum().min(5).max(50).required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
	};
	return Joi.validate(req, schema);
}


module.exports = router;