"use strict";

(function(){
	// for the navigation section slide
	//includes nav toggle button animation effect

	let nav_button = document.getElementById('nav-button-container');
	let button_tile = document.getElementById('nav-toggle-tile');
	let body = document.body;

	nav_button.addEventListener('click',() => {

		button_tile.classList.toggle('active')
		document.body.classList.toggle('active');

	});

})();

