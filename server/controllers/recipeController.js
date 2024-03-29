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
			title: 'Recipe Blog - Recipe',
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

		res.render('explore-latest', {
			title: 'Recipe Blog - Recipe',
			lastRecipes,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Something Went Wrong',
		});
	}
};

/**
 * GET /explore-random
 * Generate a random recipe
 */
exports.getRandomRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.find({});
		let randomNumber = Math.floor(Math.random() * recipe.length);
		let randomRecipe = recipe[randomNumber];

		// // To get a random as well I can do like this:
		// let count = await Recipe.find().countDocuments();
		// let random = Math.floor(Math.random() * count);
		// let randomRecipe = await Recipe.findOne().skip(random).exec();	//findOne, than skip to the random number we generate, than execute it

		res.render('explore-random', {
			title: 'Recipe Blog - Random Recipe',
			randomRecipe,
		});
		// res.json(randomRecipe[randomNumber]);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Something went wrong',
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
			title: 'Recipe Blog - Search',
			results: recipe,
			searchTerm,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Something Went Wrong',
		});
	}
};

/**
 * GET /submit-recipe
 * Submit-recipe
 */
exports.submitRecipe = async (req, res) => {
	try {
		// to store info of errors and submits, to show it later using flash
		const infoErrorsObj = req.flash('infoErrors');
		const infoSubmitObj = req.flash('infoSubmit');

		res.render('submit-recipe', {
			title: 'Recipe Blog - Submit Recipe',
			infoErrorsObj,
			infoSubmitObj,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Something Went Wrong',
		});
	}
};

/**
 * POST /submit-recipe
 * Post on submit recipe
 */
exports.submitRecipeOnPost = async (req, res) => {
	try {
		//to handle the image
		let imageUploadFile;
		let uploadPath;
		let newImageName;

		if (!req.files || Object.keys(req.files).length === 0) {
			console.log('No Files were uploaded');
		} else {
			imageUploadFile = req.files.image;
			newImageName = Date.now() + imageUploadFile.name;
			uploadPath =
				require('path').resolve('./') +
				'/public/uploads/' +
				newImageName;

			imageUploadFile.mv(uploadPath, function (err) {
				if (err) return res.status(500).send(err);
			});
		}
		// ------------ end of handling image from form ------------------

		const newRecipe = new Recipe({
			name: req.body.name,
			description: req.body.description,
			email: req.body.email,
			ingredients: req.body.ingredients,
			category: req.body.category,
			image: newImageName,
		});

		await newRecipe.save(); //to save on the database

		// if success send form, flash this infoSubmit I created
		req.flash('infoSubmit', 'Recipe has been added');

		res.redirect('/submit-recipe');
	} catch (error) {
		// if error on send form, flash this infoErrorsObj I created
		req.flash('infoErrors', error.message);
		// res.status(500).send({
		// 	message: error.message || 'Something Went Wrong',
		// });
		res.redirect('/submit-recipe');
	}
};



//async function to UPDATE some object
async function updateRecipe() {
	try {
		const res = await Recipe.updateOne(
			{ name: 'New Recipe' },
			{ name: 'New Recipe Updated' }
		);
		res.n; // Number of documents matched
		res.nModified; //Num of documents modified
	} catch (error) {
		console.log(error);
	}
}


//async function to DELETE some object
async function deleteRecipe() {
	try {
		await Recipe.deleteOne({ name: 'New Recipe Updated' });
	} catch (error) {
		console.log(error);
	}
}
