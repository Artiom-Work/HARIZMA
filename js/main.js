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
import { imagesForHall1, imagesForHall2, imagesForHall3, imagesForHall5 } from "./data.js";
import { descriptionForHall1, descriptionForHall2, descriptionForHall3, descriptionForHall5 } from "./data.js";
const imagesHall1 = JSON.parse(imagesForHall1);
const imagesHall2 = JSON.parse(imagesForHall2);
const imagesHall3 = JSON.parse(imagesForHall3);
const imagesHall5 = JSON.parse(imagesForHall5);
const descriptionHall1 = JSON.parse(descriptionForHall1);
const descriptionHall2 = JSON.parse(descriptionForHall2);
const descriptionHall3 = JSON.parse(descriptionForHall3);
const descriptionHall5 = JSON.parse(descriptionForHall5);
const hallsButtons = document.querySelectorAll('.preview__list-button');
const descriptionHallElements = document.querySelectorAll('.list-description__text');
const previewSliderBox = document.querySelector('.preview-swiper2').querySelector('.swiper-wrapper');
const previewSlider2Box = document.querySelector('.preview-swiper').querySelector('.swiper-wrapper');

let swiper;
let swiper2;


function initSwiper(images) {

	if (swiper) {
		swiper.destroy();
		swiper = undefined;
	}
	if (swiper2) {
		swiper2.destroy();
		swiper2 = undefined;
	}

	previewSliderBox.innerHTML = '';
	previewSlider2Box.innerHTML = '';

	createSlide(images, previewSlider2Box);
	createSlide(images, previewSliderBox);

	swiper = new Swiper(".preview-swiper", {
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

	swiper2 = new Swiper(".preview-swiper2", {
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
};

initSwiper(imagesHall1);

hallsButtons.forEach(btn => {
	btn.addEventListener('click', function (e) {
		offHallsButton();
		onHallButton(btn);

		let selectedImages;
		switch (btn.id) {
			case 'hall1':
				selectedImages = imagesHall1;
				descriptionHallUpdate(descriptionHall1);
				break;
			case 'hall2':
				selectedImages = imagesHall2;
				descriptionHallUpdate(descriptionHall2);
				break;
			case 'hall3':
				selectedImages = imagesHall3;
				descriptionHallUpdate(descriptionHall3);
				break;
			case 'hall5':
				selectedImages = imagesHall5;
				descriptionHallUpdate(descriptionHall5);
				break;
			default:
				selectedImages = imagesHall1;
		}

		initSwiper(selectedImages);
	});
});

function offHallsButton() {
	hallsButtons.forEach(btn => {
		btn.classList.remove('preview__list-button--active');
	});
}
function onHallButton(btn) {
	btn.classList.add('preview__list-button--active');
}
function descriptionHallUpdate(descriptionHall) {
	let { number, size, capacity } = descriptionHall[0];
	descriptionHallElements.forEach(elem => {
		if (elem && elem.id === 'hall-name') {
			elem.innerHTML = number;
		}
		if (elem && elem.id === 'hall-size') {
			elem.innerHTML = size;
		}
		if (elem && elem.id === 'hall-capacity') {
			elem.innerHTML = capacity;
		}
	});
}

function createSlide(images, sliderBox) {
	images.forEach(({ path, pathMobile, alt }) => {
		const slide = `
						<div class="swiper-slide">
							<picture class="swiper-slide__image-wrapper">
								<source srcset="${path}" media="(max-width: 767px)">
								<img src="${pathMobile}" srcset="${path}"
									alt="${alt}" />
							</picture>
						</div>
	`;
		sliderBox.insertAdjacentHTML('beforeend', slide);
	});
}
// For block steps-reservation (slider)
const mediaQuery = window.matchMedia('(max-width: 1280px)');
let tablet = true;
function handleMediaChange(e) {
	tablet = e.matches
}

handleMediaChange(mediaQuery);

mediaQuery.addEventListener('change', handleMediaChange);

const swiper3 = new Swiper(".steps-reservation__slider", {
	slidesPerView: 'auto',
	centeredSlides: true,
	spaceBetween: 33,
	grabCursor: true,
	pagination: {
		el: ".steps-reservation__slider-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".steps-reservation__slider-button--next",
		prevEl: ".steps-reservation__slider-button--prev",
	},
	breakpoints: {
		1280: {
			spaceBetween: 72
		}
	},
	on: {
		init: function () {
			updateSlideOpacity(this);
		},
		slideChange: function () {
			updateSlideOpacity(this);
			const slides = this.slides;

			slides.forEach(slide => {
				const slideImageFrame = slide.querySelector('.reservation-step__image-wrapper');
				if (slideImageFrame) {
					slideImageFrame.classList.remove('reservation-step__image-wrapper--active');
				}
				const counter = slide.querySelector('.slide-counter');
				if (counter) {
					counter.style.display = 'none';
				}
			});

			const activeSlide = slides[this.activeIndex];
			const slideImageFrame = activeSlide.querySelector('.reservation-step__image-wrapper');

			if (slideImageFrame) {
				slideImageFrame.classList.add('reservation-step__image-wrapper--active');
			}

			const activeCounter = activeSlide.querySelector('.slide-counter');
			if (activeCounter) {
				activeCounter.textContent = `${this.activeIndex + 1}`;
				activeCounter.style.display = 'block';
			}
		}
	}
});

function updateSlideOpacity(swiper) {
	if (tablet) {
		newSlideOpacityModile(swiper);
	} else {
		newSlideOpacity(swiper);
	}

	function newSlideOpacity() {
		const slides = swiper.slides;

		slides.forEach((slide, index) => {
			slide.classList.remove('opacity-100', 'opacity-50', 'opacity-20');
			if (index === swiper.activeIndex) {
				slide.classList.add('opacity-100');
			} else if (index === swiper.activeIndex - 1 || index === swiper.activeIndex + 1) {
				slide.classList.add('opacity-100');
			} else if (index === swiper.activeIndex + 2 || index === swiper.activeIndex - 2) {
				slide.classList.add('opacity-50');
			} else if (index > swiper.activeIndex + 2 || index < swiper.activeIndex - 2) {
				slide.classList.add('opacity-20');
			}
		});
	}

	function newSlideOpacityModile() {
		const slides = swiper.slides;

		slides.forEach((slide, index) => {
			slide.classList.remove('opacity-100', 'opacity-50', 'opacity-20');
			slide.classList.add('max-width-mobile');
			if (index === swiper.activeIndex) {
				slide.classList.add('opacity-100');
			} else if (index >= swiper.activeIndex - 1 || index <= swiper.activeIndex + 1) {
				slide.classList.add('opacity-50');
			}
		});
	}
}

// Changing the content of the block with pagination for sliders 1, 2 and 3
const sliderPagination = document.querySelectorAll('.slider-pagination');
sliderPagination.forEach(function (e) {
	let paginationText = e.innerHTML;
	paginationText = paginationText.replace(' / ', ' из ');
	e.innerHTML = paginationText;
});

// For section faq
$(function () {
	$("#accordion").accordion({
		active: 0,
		collapsible: true,
		header: "dt"
	});
});