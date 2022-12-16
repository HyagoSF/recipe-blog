const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes
 */
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe);  //:id is to go to an specific id
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:categoryId', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);

module.exports = router;