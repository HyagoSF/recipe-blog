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
		const latestRecipes = await Recipe.find({})
			.sort({ _id: -1 })
			.limit(limitNumber); //sorting by _id (negative 1 means from newest to oldest)
		const thai = await Recipe.find({ category: 'Thai' }).limit(limitNumber);
		const american = await Recipe.find({ category: 'American' }).limit(
			limitNumber
		);
		const chinese = await Recipe.find({ category: 'Chinese' }).limit(
			limitNumber
		);
		const food = { latestRecipes, thai, american, chinese };

		res.render('index', {
			title: 'Recipe Blog - Homepage',
			categories,
			food,
		}); //here i'm passing my title, all categories and all Recipes I found in my Recipe database(atlas)
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

/**
 * GET /categories/:categoryId
 * Category By Id
 */
exports.exploreCategoriesById = async (req, res) => {
	try {
		const categoryId = req.params.categoryId; //here i'm calling categoryId as my category name
		const limitNumber = 20;
		const categoryById = await Recipe.find({ category: categoryId }).limit(
			limitNumber
		);
		res.render('categories', {
			title: 'Recipe Blog - Categories',
			categoryId,
			categoryById,
		}); //here i'm passing my title
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some Error Occurred',
		});
	}
};

/**
 * GET /recipe/:id
 * Recipe
 */
exports.exploreRecipe = async (req, res) => {
	try {
		let recipeId = req.params.id;
		// const recipe = await Recipe.find({ '_id': recipeId });
		const recipe = await Recipe.findById(recipeId);
		res.render('recipe', {
			title: 'Cooking Blog - Recipe',
			recipe,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some Error Was Found',
		});
	}
};

/**
 * GET /explore-latest
 * Explore Latest Recipes
 */
exports.exploreLatest = async (req, res) => {
	try {
		const limitNumber = 20;
		const lastRecipes = await Recipe.find({})
			.sort({ _id: -1 })
			.limit(limitNumber);

		res.render('explore-latest', {title: 'Cooking Blog - Recipe', lastRecipes });
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Something Went Wrong',
		});
	}
};

/**
 * POST /search
 * Search
 */
exports.searchRecipe = async (req, res) => {
	try {
		const searchTerm = req.body.searchTerm;
		const recipe = await Recipe.find({
			$text: { $search: searchTerm, $diacriticSensitive: true },
		});

		res.render('search', {
			title: 'Cooking Blog - Search',
			results: recipe,
			searchTerm,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Something Went Wrong',
		});
	}
};
