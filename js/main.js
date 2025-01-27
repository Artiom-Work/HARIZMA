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
});
const swiper2 = new Swiper(".preview-swiper2", {
	spaceBetween: 10,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiper,
	},
});

const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach(entry => {
		console.log('Размеры изменились:', entry.contentRect);
		// Здесь можно обновить размеры слайдера
		swiper.update();
		swiper2.update();
	});
});

// Наблюдаем за элементом
const swiperContainer1 = document.querySelector('.preview-swiper');
const swiperContainer2 = document.querySelector('.preview-swiper2');

resizeObserver.observe(swiperContainer1);
resizeObserver.observe(swiperContainer2);

window.addEventListener('resize', () => {
	swiper.update();
	swiper2.update();
});


