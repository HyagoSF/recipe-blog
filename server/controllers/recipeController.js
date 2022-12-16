require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
	try {
		const limitNumber = 5;
		const categories = await Category.find({}).limit(limitNumber);
		res.render('index', { title: 'Recipe Blog - Homepage', categories }); //here i'm passing my title and all categories I found in my categories database
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some Error Occurred',
		});
	}
};

/**
 * GET /categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
	try {
		const limitNumber = 20;
		const categories = await Category.find({}).limit(limitNumber);
		res.render('categories', {
			title: 'Recipe Blog - Categories',
			categories,
		}); //here i'm passing my title and 20 categories I found in my categories database
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some Error Occurred',
		});
	}
};