"use strict";

//lock body after the mobile menu appeared
const menuSwitcher = document.getElementById('menu-switch');
const mobileMenu = document.querySelector('.mobile-menu__wrapper');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

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
	if (main && footer) {
		main.classList.add('hide-layer');
		footer.classList.add('hide-layer');
	}
}
function bodyUnlock() {
	document.body.classList.remove('lock-body');
	if (main && footer) {
		function visibleLayer() {
			main.classList.remove('hide-layer');
			footer.classList.remove('hide-layer');
		}

		setTimeout(visibleLayer, 400);
	}
}
//redirect paths to SVG images that are not displayed on iron brousers

document.addEventListener("DOMContentLoaded", function () {
	const userAgent = navigator.userAgent.toLowerCase();
	const isIron = userAgent.includes('iron');


	if (isIron) {
		const svgIcons = document.querySelectorAll('.iron-image');
		const additionToHref = '-iron';
		svgIcons.forEach(function (svgIcon) {
			const newHref = svgIcon.children[0].getAttribute('xlink:href') + additionToHref;
			console.log(newHref);
			svgIcon.children[0].setAttribute('xlink:href', newHref);
		});
	}
});

// For block preview (slider)

const swiper = new Swiper(".preview-swiper", {
	spaceBetween: 0,
	slidesPerView: 5,
	freeMode: true,
	watchSlidesProgress: true,
	breakpoints: {
		1500: {
			slidesPerView: 5,
		},
		1280: {
			slidesPerView: 4,
		},
		1000: {
			slidesPerView: 5,
		},
		768: {
			slidesPerView: 4,
		}
	},
});
const swiper2 = new Swiper(".preview-swiper2", {
	spaceBetween: 10,
	thumbs: {
		swiper: swiper,
	},
	pagination: {
		el: ".preview__slider-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".preview__slider-button--next",
		prevEl: ".preview__slider-button--prev",
	},
});

const sliderPagination = document.querySelector('.preview__slider-pagination');
let paginationText = sliderPagination.innerHTML;
paginationText = paginationText.replace(' / ', ' из ');
sliderPagination.innerHTML = paginationText;


