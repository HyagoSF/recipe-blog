require('../models/database');
const Category = require('../models/Category');

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
		res.render('categories', { title: 'Recipe Blog - Categories', categories }); //here i'm passing my title and 20 categories I found in my categories database
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some Error Occurred',
		});
	}
};




// // Creating my seeds function
// async function insertSeedCategoryData() {
// 	try {
// 		await Category.insertMany([
// 			{
// 				name: 'Thai',
// 				image: 'thai-food.jpg',
// 			},
// 			{
// 				name: 'American',
// 				image: 'american-food.jpg',
// 			},
// 			{
// 				name: 'Chinese',
// 				image: 'chinese-food.jpg',
// 			},
// 			{
// 				name: 'Mexican',
// 				image: 'mexican-food.jpg',
// 			},
// 			{
// 				name: 'Indian',
// 				image: 'indian-food.jpg',
// 			},
// 			{
// 				name: 'Spanish',
// 				image: 'spanish-food.jpg',
// 			},
// 		]);
// 	} catch (error) {
// 		console.log('err ' + error);
// 	}
// }

// insertSeedCategoryData();