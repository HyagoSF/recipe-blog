const mongoose = require('mongoose');

// Create a new Schema
const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'This field is required.',
	},
	description: {
		type: String,
		required: 'This field is required.',
	},
	email: {
		type: String,
		required: 'This field is required.',
	},
	ingredients: {
		type: Array,
		required: 'This field is required.',
	},
	category: {
		type: String,
		enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian', 'Spanish'], //just allow the user to choose between these options
		required: 'This field is required.',
	},
	image: {
		type: String,
		required: 'This field is required.',
	},
});

// Compile our Schema into a Model
module.exports = mongoose.model('Recipe', recipeSchema); // Recipe will be my Model name.
