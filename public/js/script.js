let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', (event) => {
	let newIngredient = ingredientDiv.cloneNode(true);
	let input = newIngredient.getElementsByTagName('input')[0]; //getElementsByTagName starts from a particular parent element and searches top-down recursively through the DOM from that parent element
	input.value = '';
    ingredientList.appendChild(input);
});
