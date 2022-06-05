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
    const loop = $slider.dataset.loop === 'false' ? false : true;

    const slidesPerView = $slider.dataset.perView || 4;
    new Swiper($slider, {
      direction: 'horizontal',
      loop,
      slidesPerView,
      spaceBetween: 32,
      watchSlidesProgress: true,
      pagination: {
        el: $pagination,
        clickable: true
      },
      navigation: {
        nextEl: $nextBtn,
        prevEl: $prevBtn,
        clickable: true
      },
      scrollbar: {
        el: '.products__slider-scrollbar',
        draggable: true,
        dragSize: 372,
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
          effect: 'creative',
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
  });

  const singleProdNavSlider = new Swiper('.single-product__nav-slider', {
    direction: 'vertical',
    slidesPerView: 6,
    spaceBetween: 16,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    mousewheel: true,
    allowTouchMove: false,
    touchRatio: 0,
    slideToClickedSlide: true,
    updateOnWindowResize: false,
    centeredSlidesBounds: true,
    watchOverflow: true,
    navigation: {
      prevEl: '.single-product__nav-prev',
      nextEl: '.single-product__nav-next',
      clickable: true
    }
  });
  if (singleProdNavSlider.params.slidesPerView < singleProdNavSlider.slides.length) {
    const $singleProductSliders = document.querySelector('.single-product__sliders');
    $singleProductSliders.classList.add('single-product__sliders--center')
  }

  const big = new Swiper('.single-product__big-slider', {
    slidesPerView: 1,
    spaceBetween: 16,
    thumbs: {
      swiper: singleProdNavSlider,
    },
    mousewheel: {
      sensitivity: 1.4,
    },
  });
  big.controller.control = singleProdNavSlider;

  new Swiper('.reviews__common-images', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    mousewheel: {
      sensitivity: 1.4,
    },
    scrollbar: {
      el: '.reviews__common-scrollbar',
      draggable: true,
      dragSize: 372,
    },
  });


  /**
   * Селекты
   */
  const $simpleFields = document.querySelectorAll('.select__field');
  $simpleFields.forEach($field => {
    const searchText = $field.dataset.searchText || null;
    const searchEnabled = $field.dataset.search === 'on' ? true : false

    new Choices($field, {
      searchEnabled,
      searchPlaceholderValue: searchText,
      paste: true,
      itemSelectText: '',
      placeholder: true,
      allowHTML: true,
      position: 'select-one',
      noResultsText: 'Не найдено',
      classNames: {
        containerOuter: 'choices swiper-no-swiping',
      }
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

  /**
   * Плавная прокрутка для якорей
   */
  const $anchors = document.querySelectorAll('a[href*="#"]');
  $anchors.forEach($anchor => {
    $anchor.addEventListener('click', e => {
      e.preventDefault();

      const id = $anchor.getAttribute('href');
      if (id === '#') {
        return;
      }

      const $elem = document.querySelector(id);
      if ($elem) {
        const offsetTop = $elem.getBoundingClientRect().top;
        window.scrollBy({ top: (offsetTop), left: 0, behavior: 'smooth' });
      }
    });
  });

  /**
   * Конфигураторы карточки товара
   */
  const $openConfigureBtns = document.querySelectorAll('.js-open-configure');
  $openConfigureBtns.forEach($btn => {
    configureName = $btn.dataset.name
    const $configure = document.querySelector(`.configure[data-name="${configureName}"]`);

    if (!configureName || !$configure) {
      return
    }

    $btn.addEventListener('click', () => {
      closeShowedConfigure();
      closeProductConfig();
      $configure.classList.add('configure--show');
    });
  });

  const $configures = document.querySelectorAll('.configure');
  $configures.forEach($configure => {
    const $closeBtn = $configure.querySelector('.configure__close');
    $closeBtn.addEventListener('click', () => {
      $configure.classList.remove('configure--show');
    });

    $configure.addEventListener('click', e => {
      if (e.target.classList.contains('configure__item-btn') ||
        e.target.closest('.configure__item-btn')) {
        const $activeItem = $configure.querySelector('.is-selected')
        $activeItem.classList.remove('configure__item--active', 'is-selected');

        const $item = e.target.closest('.configure__item');
        $item.classList.add('configure__item--active', 'is-selected');
      }
    });
  });
  window.addEventListener('click', e => {
    if (e.target.closest('.js-open-configure') || e.target.classList.contains('js-open-configure')) {
      return;
    }

    if (!e.target.closest('.configure')) {
      closeShowedConfigure();
    }
  });

  setProductConfigPosition();
  window.addEventListener('resize', setProductConfigPosition);
  function setProductConfigPosition() {
    const $productConfig = document.querySelector('.product-config');
    if ($productConfig) {
      const bannerHeight = document.querySelector('.banner').offsetHeight;
      const headerHeight = document.querySelector('.header').offsetHeight;
      const offsetTop = bannerHeight + headerHeight + 1;
      $productConfig.style.top = `${offsetTop}px`;
      $productConfig.style.height = `calc(100vh - ${offsetTop}px`;
    }
  }

  const $productConfig = document.querySelector('.product-config');
  if ($productConfig) {
    const $body = document.body;

    const $openProductConfigBtns = document.querySelectorAll('.js-open-product-config');
    $openProductConfigBtns.forEach($btn => {
      $btn.addEventListener('click', () => {
        window.scrollTo(0, 0);
        $body.classList.add('body--lock');
        $productConfig.classList.add('product-config--show');
        closeShowedConfigure();
      });
    });

    const $closeBtn = $productConfig.querySelector('.product-config__close');
    $closeBtn.addEventListener('click', closeProductConfig);
  }

  function closeShowedConfigure() {
    const $showedConfigure = document.querySelector('.configure--show');
    if ($showedConfigure) {
      $showedConfigure.classList.remove('configure--show');
    }
  }

  function closeProductConfig() {
    const $body = document.body;
    const $productConfig = document.querySelector('.product-config');
    if ($productConfig) {
      $body.classList.remove('body--lock');
      $productConfig.classList.remove('product-config--show');
    }
  }

  /**
   * Галерея изображений
   */
  const $singleBigSliderWrapper = document.querySelector('.single-product__big-slider .swiper-wrapper');
  lightGallery($singleBigSliderWrapper, {
    plugins: [lgThumbnail],
    speed: 500,
    selector: '.swiper-slide',
    download: false,
    thumbnail: true,
    thumbHeight: '63px',
    showThumbByDefault: true,
    loop: true,
    mousewheel: true,
    slideEndAnimation: false,
  });

  const $reviewsCommonImages = document.querySelector('.reviews__common-images .swiper-wrapper');
  lightGallery($reviewsCommonImages, {
    plugins: [lgThumbnail],
    speed: 500,
    selector: '.swiper-slide',
    download: false,
    thumbnail: true,
    thumbHeight: '63px',
    loop: true,
    mousewheel: true,
    slideEndAnimation: false,
    thumbnail: true,
  });

  const $reviewImagesBoxes = document.querySelectorAll('.review__images');
  $reviewImagesBoxes.forEach($imagesBox => {
    lightGallery($imagesBox, {
      plugins: [lgThumbnail],
      speed: 500,
      download: false,
      thumbnail: true,
      thumbHeight: '63px',
      loop: true,
      mousewheel: true,
      slideEndAnimation: false,
    });
  });

  /**
   * Скроллбар
   */
  const $configureLists = document.querySelectorAll('.configure__list');
  $configureLists.forEach($list => {
    new PerfectScrollbar($list, {
      wheelSpeed: 1,
      wheelPropagation: false,
    });
  });

  const $scrollbars = document.querySelectorAll('.ps');
  $scrollbars.forEach($scrollbar => {
    scrollbarShadowHandler($scrollbar);

    $scrollbar.addEventListener('scroll', e => {
      scrollbarShadowHandler($scrollbar)
    });
  });

  function scrollbarShadowHandler($scrollbar) {
    const scrollTop = $scrollbar.scrollTop;
    const scrollHeight = $scrollbar.scrollHeight - $scrollbar.offsetHeight

    if ($scrollbar.classList.contains('ps--shadow-top') &&
      (scrollTop - 10) <= 0) {
      $scrollbar.classList.remove('ps--shadow-top');
    } else if (!$scrollbar.classList.contains('ps--shadow-top') &&
      (scrollTop - 10) >= 0) {
      $scrollbar.classList.add('ps--shadow-top');
    }

    if ($scrollbar.classList.contains('ps--shadow-bottom') &&
      (scrollTop + 10) >= scrollHeight) {
      $scrollbar.classList.remove('ps--shadow-bottom');
    } else if (!$scrollbar.classList.contains('ps--shadow-bottom') &&
      (scrollTop + 10) < scrollHeight) {
      $scrollbar.classList.add('ps--shadow-bottom');
    }
  }

  /**
   * Корзина/Оформление заказа
   */
  const $discount = document.querySelector('.cart__discount');
  if ($discount) {
    const $toggleDiscount = document.querySelector('.cart__discount-btn');
    $toggleDiscount.addEventListener('click', () => {
      $discount.classList.toggle('cart__discount--show');
    });
  }

  /**
   * Счётчик
   */
  const $counters = document.querySelectorAll('.counter');
  $counters.forEach($counter => {
    const $input = $counter.querySelector('.counter__value');
    const $minus = $counter.querySelector('.counter__btn--minus');
    const $plus = $counter.querySelector('.counter__btn--plus');

    $minus.addEventListener('click', () => {
      if (+$input.value <= 0) {
        $input.value = 0
      } else {
        $input.value = +$input.value - 1;
      }
    });

    $plus.addEventListener('click', () => {
      $input.value = +$input.value + 1;
    });

    $input.addEventListener('input', e => {
      if (+$input.value < 0)
        $input.value = 0
    });
  });

  /**
   * Модальные окна
   */
  Fancybox.bind("[data-fancybox]", {
    template: {
      closeButton: `
        <svg class="icon"> 
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/icons.svg#exit"></use>
        </svg>`,
    },
    dragToClose: false
  });

  /**
   * Кнопки "Добавить в избранное"
   */
  const $wishlistBtns = document.querySelectorAll('.wishlist-btn');
  $wishlistBtns.forEach($btn => {
    $btn.addEventListener('click', () => {
      $btn.classList.toggle('wishlist-btn--active');
    });
  });
});

