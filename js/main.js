"use strict";

//lock body after the mobile menu appeared
const menuSwitcher = document.getElementById('menu-switch');
const mobileMenu = document.querySelector('.mobile-menu__wrapper');

menuSwitcher.addEventListener('change', (e) => {
	if (e.target.checked) {
		bodyLock();
	} else if (!e.target.checked) {
		bodyUnlock();
	}
});
mobileMenu.addEventListener('click', (e) => {
	menuSwitcher.checked = false;
	bodyUnlock();
});

function bodyLock() {
	document.body.classList.add('lock-body');
}
function bodyUnlock() {
	document.body.classList.remove('lock-body');
}