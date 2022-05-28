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

  const $productSliders = document.querySelectorAll('.product__slider');
  $productSliders.forEach($slider => {
    let sliderCard = null;
    let $paginationClone = null
    $slider.addEventListener('mouseenter', function () {
      if (window.innerWidth <= 768) {
        return false;
      }

      const $pagination = $slider.querySelector('.js-product-slider-pagination');
      if (!$slider.classList.contains('swiper-initialized')) {
        sliderCard = new Swiper($slider, {
          init: true,
          loop: true,
          slidesPerView: 1,
          pagination: {
            el: $pagination,
            clickable: true,
          },
          on: {
            afterInit: function () {
              clonePagination(this)
            },
            slideChange: function () {
              clonePagination(this)
            }
          }
        });
      }

      const $sliderBullets = $pagination.querySelectorAll('.swiper-pagination-bullet');
      $sliderBullets.forEach($bullet => {
        $bullet.addEventListener('mouseenter', () => {
          $bullet.click();
        });
      })
    });

    $slider.addEventListener('mouseleave', function () {
      if (window.innerWidth <= 768 || !sliderCard) {
        return false;
      }

      const $paginationClone = this.querySelector('.swiper-pagination--clone');
      $paginationClone.remove();

      sliderCard.destroy();
    });

    function clonePagination($slider) {
      const $pagination = $slider.pagination.el;
      if (!$pagination) {
        return
      }

      if ($paginationClone !== null) {
        $paginationClone.remove()
      }

      $paginationClone = $pagination.cloneNode(true);
      $paginationClone.classList.add('swiper-pagination--clone');
      $pagination.parentNode.appendChild($paginationClone);
    };
  })
});

/**
 * Селекты
 */
 const $simpleFields = document.querySelectorAll('.select__field');
 $simpleFields.forEach($field => {
   new Choices($field, {
     searchEnabled: false,
     itemSelectText: '',
     placeholder: true,
     allowHTML: true,
     position: 'select-one',
     noResultsText: 'Не найдено',
   });

   $field.addEventListener('addItem', (e) => {
    const text = $field.dataset.selectText;
    if (!text || !e.detail.value) {
      return;
    }
  
    const $select = $field.closest('.select');
    const $innerItem = $select.querySelector('.choices__inner .choices__item');
    $innerItem.childNodes[0].textContent = `${text}: ${e.detail.label}`;
  }, false);
 });