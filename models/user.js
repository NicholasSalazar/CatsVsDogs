const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const jwt = require('jsonwebtoken');






const userSchema = new mongoose.Schema({
	name: {
	type: String, required: true,
	minlength: 5,
	maxlength: 50 },
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},

	adminPrivilege: {
		type: Boolean, required: true,
		default: false,
	},
	
	dateCreated: { type: Date, default: Date.now},
});

userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id, userName: this.name, adminPrivilege: this.adminPrivilege}, 'jwtPrivateKey');
return token;
}
const User = mongoose.model('User', userSchema);

	//<---! Validate User ! --->

function validateUser(user){
	const schema = {
		name: Joi.string().alphanum().min(5).max(50).required(),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
		email: Joi.string().email(),
		adminPrivilege: Joi.string(),
		isGuest: Joi.string()
	};
	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

// async function createUser(){
// const user = new User({
// 	name: 'Jimmy Neutron',
// 	email: 'test@graceland.edu',
// 	password: 'cookies2',
// 	isPublished: true
// });
// try {
// const result = await user.save();
// console.log(result);
// }
// catch(ex) {
// 	console.log(ex.message);
// }
// }

// async function getUsers(){
// 	const users = await User.find();
// 	console.log(users);
// }

// getUsers();

// createUser();



