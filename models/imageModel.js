const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const imageschema = new mongoose.Schema({
	imgID: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },
	img: {
		data: Buffer, contentType: String
	}
});

const Image = mongoose.model('Image', imageschema);



exports.Image = Image;
