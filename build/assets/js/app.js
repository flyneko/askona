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
      if ($link.classList.contains('phone-link--active')) {
        return;
      }

      $value.innerText = $link.dataset.phone;

      const tel = $link.dataset.phone.replace(/\s/g, '');
      $link.setAttribute('href', `tel:${tel}`);
      $link.removeAttribute('data-phone');
      $link.classList.add('phone-link--active');
    });
  });

  /**
   * Шапка
   */
  const $header = document.querySelector('.header');
  if ($header) {
    if (window.innerWidth <= 991) {
      headerHandler();
    }

    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 991) {
        headerHandler();
      }
    });
  }

  function headerHandler() {
    const $header = document.querySelector('.header');
    const offsetTop = 48;

    if (window.scrollY >= offsetTop && !$header.classList.contains('header--fixed')) {
      $header.classList.add('header--fixed');
    } else if (window.scrollY < offsetTop && $header.classList.contains('header--fixed')) {
      $header.classList.remove('header--fixed');
    }
  }

  /**
   * Слайдеры
   */
  new Swiper('.js-events-slider', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    loopedSlides: 20,
    spaceBetween: 8,
    pagination: {
      el: '.js-events-slider-pagination',
      clickable: true
    },
    breakpoints: {
      1440: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 32,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      520: {
        slidesPerView: 2,
      },
    }
  });

  new Swiper('.js-categories-slider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 8,
    pagination: {
      el: '.js-categories-slider-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.js-categories-slider-next',
      prevEl: '.js-categories-slider-prev',
      clickable: true
    },
    breakpoints: {
      1360: {
        slidesPerView: 5,
        spaceBetween: 32,
      },
      1140: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      768: {
        spaceBetween: 16,
        slidesPerView: 3,
      },
      520: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    }
  });

  new Swiper('.advantages__slider', {
    direction: 'horizontal',
    slidesPerView: 1.15,
    spaceBetween: 8,
    enabled: true,
    loop: true,
    pagination: {
      el: '.advantages__slider-pagination',
      clickable: true
    },
    breakpoints: {
      1140: {
        slidesPerView: 3,
        spaceBetween: 0,
        enabled: false,
        loop: false
      },
      861: {
        spaceBetween: 0,
        enabled: false,
        loop: false
      },
      860: {
        slidesPerView: 2,
        spaceBetween: 16,
        enabled: true,
        loop: false
      },
      580: {
        slidesPerView: 2,
        spaceBetween: 16,
        enabled: true,
      },
    }
  });

  new Swiper('.features__slider', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 8,
    loop: true,
    pagination: {
      el: '.features__slider-pagination',
      clickable: true
    },
    breakpoints: {
      1140: {
        slidesPerView: 3,
        spaceBetween: 32,
        loop: false
      },
      860: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      580: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    }
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
      loop: false,
      slidesPerView: 1.5,
      spaceBetween: 24,
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
        dragSize: 47,
      },
      breakpoints: {
        1280: {
          slidesPerView,
          spaceBetween: 32,
          scrollbar: {
            dragSize: 372,
          },
        },
        860: {
          slidesPerView: 3,
          scrollbar: {
            dragSize: 186,
          },
        },
        580: {
          slidesPerView: 2,
          spaceBetween: 16,
          loop,
          scrollbar: {
            dragSize: 93,
          },
        },
      }
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
    enabled: false,
    navigation: {
      prevEl: '.single-product__nav-prev',
      nextEl: '.single-product__nav-next',
      clickable: true,
    },
    breakpoints: {
      991: {
        enabled: true,
      },
    }
  });

  const $singleProdSliders = document.querySelector('.single-product__sliders');
  if ($singleProdSliders) {
    singleSlidersHandler();
    window.addEventListener('resize', singleSlidersHandler);
  }

  function singleSlidersHandler() {
    const $navSlider = document.querySelector('.single-product__nav-slider');
    const activeClass = 'single-product__nav-slider--active';
    if (window.innerWidth > 991 && !$navSlider.classList.contains(activeClass)) {
      $navSlider.classList.add(activeClass);
      singleSlidersCenteringHandler();

      singleProdNavSlider.update();
    } else if (window.innerWidth <= 991 && $navSlider.classList.contains(activeClass)) {
      $navSlider.classList.remove(activeClass);
      singleSlidersCenteringHandler();
    }
  }

  function singleSlidersCenteringHandler() {
    const $singleProductSliders = document.querySelector('.single-product__sliders');
    if (singleProdNavSlider.params.slidesPerView < singleProdNavSlider.slides.length) {
      $singleProductSliders.classList.add('single-product__sliders--center')
    } else {
      $singleProductSliders.classList.remove('single-product__sliders--center')
    }
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
    pagination: {
      el: '.single-product__big-slider-pagination',
      clickable: true
    }
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
      dragSize: 47,
    },
    breakpoints: {
      1280: {
        scrollbar: {
          dragSize: 372,
        },
      },
      860: {
        scrollbar: {
          dragSize: 186,
        },
      },
      580: {
        scrollbar: {
          dragSize: 93,
        },
      }
    }
  });

  /**
   * Отзывы
   */
  const $reviews = document.querySelector('.reviews');
  if ($reviews) {
    moveAddReviewBtn();
    window.addEventListener('resize', moveAddReviewBtn);

    function moveAddReviewBtn() {
      moveElement({
        element: '.reviews__add-btn',
        from: '.reviews__common-header',
        to: '.reviews__common-footer',
        width: 991
      });
    }
  }


  /**
   * Селекты
   */
  const $simpleFields = document.querySelectorAll('.select__field');
  $simpleFields.forEach($field => {
    const searchText = $field.dataset.searchText || null;
    const searchEnabled = $field.dataset.search === 'on' ? true : false;

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
   * Описание товара
   */
  const $singleProduct = document.querySelector('.single-product');
  if ($singleProduct) {
    moveProductInfo();
    window.addEventListener('resize', moveProductInfo);

    function moveProductInfo() {
      moveElement({
        element: '.single-product__info',
        from: '.single-product__sidebar',
        to: '.single-product__mobile-info',
        width: 991
      });
    }
  }

  /**
   * Конфигураторы карточки товара
   */
  const $configures = document.querySelectorAll('.configure');
  $configures.forEach($configure => {
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

  setProductConfigPosition();
  window.addEventListener('resize', setProductConfigPosition);
  function setProductConfigPosition() {
    const $productConfig = document.querySelector('.product-config');
    if ($productConfig) {
      const offsetTop = getBannerHeaderHeight() + 2;
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
      });
    });

    const $closeBtn = $productConfig.querySelector('.product-config__close');
    $closeBtn.addEventListener('click', closeProductConfig);
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
  const $customScrollbars = document.querySelectorAll('.js-custom-scrollbar');
  $customScrollbars.forEach($scrollbar => {
    let ps = createScrollbar($scrollbar);

    if ($scrollbar.classList.contains('mobile-menu__content')) {
      const $mobileMenuItems = $scrollbar.querySelectorAll('.mobile-menu__item');
      $mobileMenuItems.forEach($item => {
        const $btn = $item.querySelector('.mobile-menu__link');
        $btn.addEventListener('click', () => {
          ps.destroy();

          const $backBtn = $item.querySelector('.mobile-menu__back');
          $backBtn.addEventListener('click', () => {
            if (!$scrollbar.classList.contains('ps')) {
              ps = createScrollbar($scrollbar);
            }
          });
        });
      });
    }

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
  moveOrderResultInfo();
  window.addEventListener('resize', moveOrderResultInfo);

  function moveOrderResultInfo() {
    moveElement({
      element: '.order-result__info',
      from: '.order__result',
      to: '.order-form__mobile-result',
      width: 767
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

  /**
   * Меню "Все товары"
   */
  const $catalogMenu = document.querySelector('.catalog-menu');
  if ($catalogMenu) {
    setCatalogMenuPosition();
    window.addEventListener('resize', setCatalogMenuPosition)

    const $openCatalogMenuBtns = document.querySelectorAll('.js-open-catalog-menu');
    $openCatalogMenuBtns.forEach($btn => {
      $btn.addEventListener('click', () => {
        $catalogMenu.classList.toggle('catalog-menu--show');

        const $icon = $btn.querySelector('.icon-menu');
        if ($icon) {
          $icon.classList.toggle('icon-menu--active')
        }
      });
    });

    window.addEventListener('click', e => {
      if (e.target.closest('.js-open-catalog-menu') || e.target.classList.contains('js-open-catalog-menu')) {
        return;
      }

      const ignoreClass = 'swiper-pagination-bullet';
      if (!e.target.closest('.catalog-menu') && !e.target.closest(`.${ignoreClass}`)) {
        closeCatalogMenu();
      }
    });

    function closeCatalogMenu() {
      const $catalogMenu = document.querySelector('.catalog-menu');
      if (!$catalogMenu.classList.contains('catalog-menu--show')) {
        return;
      }

      $catalogMenu.classList.remove('catalog-menu--show');

      const $openBtns = document.querySelectorAll('.js-open-catalog-menu');
      $openBtns.forEach($btn => {
        const $icon = $btn.querySelector('.icon-menu');
        if ($icon) {
          $icon.classList.remove('icon-menu--active')
        }
      });
    }

    function setCatalogMenuPosition() {
      const $catalogMenu = document.querySelector('.catalog-menu');
      const $catalogMenuList = $catalogMenu.querySelector('.catalog-menu__list');
      const offsetTop = getBannerHeaderHeight();
      $catalogMenu.style.top = `calc(${offsetTop}px)`;
      $catalogMenu.style.minHeight = `calc(100vh - ${offsetTop}px - 1px)`;
      $catalogMenuList.style.minHeight = `calc(100vh - ${offsetTop}px - 1px)`;
    }
  }

  /**
   * Custom range input
   */
  const $priceFilters = document.querySelectorAll('.price-filter');
  $priceFilters.forEach($filter => {
    const $slider = $filter.querySelector('.price-filter__slider');

    const data = {
      min: +$slider.dataset.min,
      max: +$slider.dataset.max,
      startMin: +$slider.dataset.startMin,
      startMax: +$slider.dataset.startMax,
      step: +$slider.dataset.step,
    };

    noUiSlider.create($slider, {
      start: [data.startMin, data.startMax],
      connect: true,
      step: data.step,
      range: {
        'min': data.min,
        'max': data.max
      },
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value);
        }
      }
    });

    const $minInput = $filter.querySelector('.price-filter__field--min');
    const $maxInput = $filter.querySelector('.price-filter__field--max');
    $minInput.addEventListener('blur', () => {
      $slider.noUiSlider.set($minInput.value);
    });

    $maxInput.addEventListener('blur', () => {
      $slider.noUiSlider.set([null, $maxInput.value]);
    });

    $slider.noUiSlider.on('update', function (values, handle, unencoded) {
      $minInput.value = `${values[0]} ₸`;
      $maxInput.value = `${values[1]} ₸`;
    });
  });

  /**
   * Попапы: фильтры, конфигурации
   */
  const $openPopupBtns = document.querySelectorAll('.js-open-popup');
  $openPopupBtns.forEach($btn => {
    const popupName = $btn.dataset.popupName;
    const $popup = document.querySelector(`.popup[data-name="${popupName}"]`);

    if (!popupName || !$popup) {
      return;
    }

    $btn.addEventListener('click', e => {
      closeShowedPopup();

      const isPopupMobile = $popup.classList.contains('popup--mobile');
      if (isPopupMobile && window.innerWidth > 991) {
        return
      }

      e.preventDefault();

      $popup.classList.add('popup--show');

      const lockWidth = $popup.dataset.lockWidth;
      if (lockWidth && window.innerWidth <= +lockWidth) {
        document.body.classList.add('body--lock');
      }
    });
  });

  const $popups = document.querySelectorAll('.popup');
  $popups.forEach($popup => {
    const $closeBtn = $popup.querySelector('.popup__close');
    if ($closeBtn) {
      $closeBtn.addEventListener('click', () => {
        closeShowedPopup();
      });
    }
  });

  window.addEventListener('click', e => {
    const $showedPopup = document.querySelector('.popup--show');

    if (!$showedPopup ||
      e.target.closest('.js-open-popup') ||
      e.target.classList.contains('js-open-popup')) {
      return;
    }

    const $clickedPopup = e.target.closest('.popup');
    if ($clickedPopup && $showedPopup !== $clickedPopup) {
      closeShowedPopup();
      return
    }

    const isPopupMobile = $showedPopup.classList.contains('popup--mobile');
    if (isPopupMobile && window.innerWidth > 991) {
      closeShowedPopup();
      return
    }

    const ignoreClasses = ['swiper-pagination-bullet', 'lg-container'];
    for (let ignoreClass of ignoreClasses) {
      if (e.target.closest(`.${ignoreClass}`)) {
        return
      }
    }

    if (!e.target.closest('.popup')) {
      closeShowedPopup();
    }
  });

  function closeShowedPopup() {
    const $popup = document.querySelector('.popup--show');
    if ($popup) {
      $popup.classList.remove('popup--show');
      document.body.classList.remove('body--lock');
    }
  }

  /**
   * Аккордеон
   */
  const $accordions = document.querySelectorAll('.accordion');
  $accordions.forEach($accordion => {
    const $header = $accordion.querySelector('.accordion__header');
    $header.addEventListener('click', () => {
      $accordion.classList.toggle('accordion--active');
    });
  });

  /**
   * Фильтры с всплывающим меню
   */
  const $filterMenus = document.querySelectorAll('.filter-menu');
  $filterMenus.forEach($menu => {
    const $btn = $menu.querySelector('.filter-menu__btn');
    $btn.addEventListener('click', () => {
      $menu.classList.toggle('filter-menu--active');
    })
  });
  window.addEventListener('click', e => {
    const ignoreClass = 'swiper-pagination-bullet';
    if (e.target.closest(`.${ignoreClass}`)) {
      return;
    }

    const $activeFilterMenus = document.querySelectorAll('.filter-menu--active');
    if (e.target.closest('.filter-menu')) {
      const $thisFilter = e.target.closest('.filter-menu');
      $activeFilterMenus.forEach($filter => {
        if ($filter !== $thisFilter) {
          $filter.classList.remove('filter-menu--active')
        }
      })
    } else {
      $activeFilterMenus.forEach($filter => $filter.classList.remove('filter-menu--active'));
    }
  });

  /**
   * Мобильное меню
   */
  const $mobileMenu = document.querySelector('.mobile-menu');
  if ($mobileMenu) {
    const $items = $mobileMenu.querySelectorAll('.mobile-menu__item');
    $items.forEach($item => {
      const $btn = $item.querySelector('.mobile-menu__link');
      $btn.addEventListener('click', () => {
        const $activeItem = $mobileMenu.querySelector('.mobile-menu__item--active');
        if ($activeItem) {
          $activeItem.classList.remove('mobile-menu__item--active');
        }

        $item.classList.add('mobile-menu__item--active');

        const $backBtn = $item.querySelector('.mobile-menu__back');
        $backBtn.addEventListener('click', () => {
          $item.classList.remove('mobile-menu__item--active');
        });
      });
    });

    const $openMobileMenuBtns = document.querySelectorAll('.js-open-mobile-menu');
    $openMobileMenuBtns.forEach($btn => {
      $btn.addEventListener('click', () => {
        setMobileMenuPosition();

        $mobileMenu.classList.toggle('mobile-menu--show');
        const $icon = $btn.querySelector('.icon-menu');
        if ($icon) {
          $icon.classList.toggle('icon-menu--active')
        }

        if ($mobileMenu.classList.contains('mobile-menu--show')) {
          document.body.classList.add('body--lock');
        } else {
          document.body.classList.remove('body--lock');
        }
      });
    });

    setMobileMenuPosition();

    function setMobileMenuPosition() {
      const $menu = document.querySelector('.mobile-menu');
      const $content = $mobileMenu.querySelector('.mobile-menu__content');
      const headerHeight = getHeaderHeight();
      const bannerHeight = getBannerHeight();

      let offsetTop = headerHeight;
      if (window.scrollY < bannerHeight) {
        offsetTop += bannerHeight - window.scrollY;
      }

      $menu.style.top = `calc(${offsetTop}px - 1px)`;
      $mobileMenu.style.height = `calc(100vh - ${offsetTop}px)`;
      $content.style.maxHeight = `calc(100vh - ${offsetTop}px)`;
    }
  }

  /**
   * Логотип
   */
  const $logo = document.querySelector('.logo');
  if ($logo) {
    const $object = $logo.querySelector('.logo__object');
    const $svg = $object.contentDocument;
    if (!$svg) {
      return;
    }
    
    const $circles = $svg.querySelectorAll('.circle');
    const circlesRadiuse = [...$circles].map($circle => $circle.getAttribute('r'))
    const minRadiuse = 1.2;
    const delay = 1500;

    circlesAnimate();
    setInterval(() => {
      if (!document.hidden) {
        circlesAnimate();
      }
    }, delay + 200 * $circles.length);

    function circlesAnimate() {
      $circles.forEach(($circle, index) => {
        setTimeout(() => {
          $circle.setAttribute('r', minRadiuse);

          setTimeout(() => {
            $circle.setAttribute('r', circlesRadiuse[index]);
          }, 300);
        }, 200 * (index))
      });
    }
  }
});

function getBannerHeaderHeight() {
  return getBannerHeight() + getHeaderHeight();
}

function getHeaderHeight() {
  const $header = document.querySelector('.header');
  if ($header) {
    return $header.offsetHeight;
  }

  return 0;
}

function getBannerHeight() {
  const $banner = document.querySelector('.banner');
  if ($banner) {
    return $banner.offsetHeight;
  }

  return 0;
}

function createScrollbar($scrollbar) {
  const wheelSpeed = $scrollbar.dataset.speed ? +$scrollbar.dataset.speed : 1;
  const offXScroll = $scrollbar.dataset.scrollX === 'on' ? false : true;

  return new PerfectScrollbar($scrollbar, {
    wheelSpeed,
    wheelPropagation: false,
    suppressScrollX: offXScroll,
  })
}

function moveElement({ element, from, to, width }) {
  const $elem = document.querySelector(element);
  const $from = document.querySelector(from);
  const $to = document.querySelector(to);

  if (!$elem || !$from || !$to) {
    return;
  }

  setTimeout(() => {
    if (window.innerWidth <= width && $elem.parentNode === $from) {
      $to.append($elem);
    } else if (window.innerWidth >= width && $elem.parentNode !== $from) {
      $from.append($elem);
    }
  });
}