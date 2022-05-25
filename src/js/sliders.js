import Swiper, { Pagination, Navigation } from 'swiper';

window.addEventListener('load', () => {
  new Swiper('.js-events-slider', {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 32,
    modules: [Pagination],
  
    pagination: {
      el: '.js-events-slider-pagination',
      clickable: true
    },
  });
  
  new Swiper('.js-categories-slider', {
    direction: 'horizontal',
    slidesPerView: 5,
    spaceBetween: 32,
    modules: [Pagination, Navigation],
  
    pagination: {
      el: '.js-categories-slider-pagination',
      clickable: true
    },
  
    navigation: {
      nextEl: '.js-categories-slider-next',
      prevEl: '.js-categories-slider-prev',
      clickable: true
    },
  });
  
  const $productsSliderBoxes = document.querySelectorAll('.products__slider');
  $productsSliderBoxes.forEach($box => {
    const $slider = $box.querySelector('.js-products-slider')
    const $pagination = $box.querySelector('.js-products-slider-pagination');
    const $nextBtn = $box.querySelector('.js-products-slider-next');
    const $prevBtn = $box.querySelector('.js-products-slider-prev');
  
    new Swiper($slider, {
      direction: 'horizontal',
      slidesPerView: 4,
      spaceBetween: 32,
      modules: [Pagination, Navigation],
  
      pagination: {
        el: $pagination,
        clickable: true
      },
  
      navigation: {
        nextEl: $nextBtn,
        prevEl: $prevBtn,
        clickable: true
      },
    });
  });
});