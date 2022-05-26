window.addEventListener('load', () => {

  /**
   * Функционал для кнопок "Показать номер"
   */
  const $phoneShowBtns = document.querySelectorAll('.phone-link__show-btn');
  $phoneShowBtns.forEach($btn => {
    $btn.addEventListener('click', e => {
      e.preventDefault();

      const $link = $btn.closest('.phone-link');
      const $value = $link.querySelector('.phone-link__value');
      if (!$link.classList.contains('phone-link--hidden')) {
        return;
      }

      $value.innerText = $link.dataset.phone;

      const tel = $link.dataset.phone.replace(/\s/g, '');
      $link.setAttribute('href', `tel:${tel}`);
      $link.removeAttribute('data-phone');
      $link.classList.remove('phone-link--hidden');

    });
  });

  /**
   * Слайдеры
   */

  new Swiper('.js-events-slider', {
    slidesPerView: 'auto',
    loop: true,
    centeredSlides: true,
    loopedSlides: 20,
    spaceBetween: 32,
    pagination: {
      el: '.js-events-slider-pagination',
      clickable: true
    },
  });

  new Swiper('.js-categories-slider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5,
    spaceBetween: 32,

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
      loop: true,
      slidesPerView: 4,
      spaceBetween: 32,
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