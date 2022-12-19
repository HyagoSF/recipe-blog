let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', (event) => {
	let newIngredient = ingredientDiv.cloneNode(true);
	let input = newIngredient.getElementsByTagName('input')[0]; //getElementsByTagName starts from a particular parent element and searches top-down recursively through the DOM from that parent element
	input.value = '';
	ingredientList.appendChild(input);
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
	'use strict';

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll('.needs-validation');

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			'submit',
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			},
			false
		);
	});
})();
