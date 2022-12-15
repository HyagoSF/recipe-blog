const mongoose = require('mongoose');

// Create a new Schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'This field is required',
	},
	image: {
		type: String,
		required: 'This field is required',
	},
});

// Compile our Schema into a Model
module.exports = mongoose.model('Category', categorySchema); //Category will be my Model name.
