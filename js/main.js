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

// For block steps-reservation (slider)

const mediaQuery = window.matchMedia('(max-width: 1280px)');
let tablet = true;
function handleMediaChange(e) {
	tablet = e.matches
}
// Вызываем функцию при инициализации
handleMediaChange(mediaQuery);
// Добавляем слушатель для изменения состояния медиазапроса
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
			updateSlideOpacity(this); // Устанавливаем начальную прозрачность
		},
		slideChange: function () {
			updateSlideOpacity(this); // Обновляем прозрачность при смене слайда
			// Получаем все слайды внутри слайдера

			const slides = this.slides; // Используем `this.slides`, чтобы получить доступ к слайдам

			// Удаляем класс у всех слайдов
			slides.forEach(slide => {
				const slideImageFrame = slide.querySelector('.reservation-step__image-wrapper');
				if (slideImageFrame) { // Проверяем, существует ли элемент
					slideImageFrame.classList.remove('reservation-step__image-wrapper--active');
				}
				const counter = slide.querySelector('.slide-counter');
				if (counter) {
					counter.style.display = 'none';
				}
			});

			// Находим активный слайд
			const activeSlide = slides[this.activeIndex];
			const slideImageFrame = activeSlide.querySelector('.reservation-step__image-wrapper');

			// Добавляем класс к активному слайду
			if (slideImageFrame) { // Проверяем, существует ли элемент
				slideImageFrame.classList.add('reservation-step__image-wrapper--active');
			}
			// Обновляем и показываем счётчик на активном слайде
			const activeCounter = activeSlide.querySelector('.slide-counter');
			if (activeCounter) {
				activeCounter.textContent = `${this.activeIndex + 1}`; // Обновляем текст счётчика
				activeCounter.style.display = 'block'; // Показываем счётчик
			}
		}
	}
});
// Функция для обновления прозрачности слайдов
function updateSlideOpacity(swiper) {
	if (tablet) {
		newSlideOpacityModile(swiper);
	} else {
		newSlideOpacity(swiper);
	}

	function newSlideOpacity() {
		const slides = swiper.slides;

		slides.forEach((slide, index) => {
			slide.classList.remove('opacity-100', 'opacity-50', 'opacity-20'); // Удаляем все классы

			if (index === swiper.activeIndex) {
				slide.classList.add('opacity-100'); // Активный слайд
			} else if (index === swiper.activeIndex - 1 || index === swiper.activeIndex + 1) {
				slide.classList.add('opacity-100'); // Предыдущий и следующий слайды
			} else if (index === swiper.activeIndex + 2 || index === swiper.activeIndex - 2) {
				slide.classList.add('opacity-50'); // Слайды дальше от активного
			} else if (index > swiper.activeIndex + 2 || index < swiper.activeIndex - 2) {
				slide.classList.add('opacity-20'); // Остальные слайды
			}
		});
	}

	function newSlideOpacityModile() {
		const slides = swiper.slides;

		slides.forEach((slide, index) => {
			slide.classList.remove('opacity-100', 'opacity-50', 'opacity-20'); // Удаляем все классы
			slide.classList.add('max-width-mobile');
			if (index === swiper.activeIndex) {
				slide.classList.add('opacity-100'); // Активный слайд
			} else if (index >= swiper.activeIndex - 1 || index <= swiper.activeIndex + 1) {
				slide.classList.add('opacity-50'); // Предыдущий и следующий слайды
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