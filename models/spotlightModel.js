const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const spotlightschema = new mongoose.Schema({
	Title: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },
	Description: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 10000
	},
	DVC:{
		type: Boolean, required: true,
	},
	ImageName: {
	type: String,
	minlength: 1,
	maxlength: 100 },
	img: {
		data: Buffer, contentType: String
	},
});

const Spotlight = mongoose.model('Spotlight', spotlightschema);



exports.Spotlight = Spotlight;
