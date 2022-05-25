import './sliders.js';

/**
 * Функционал для кнопок "Показать номер"
 */
const $phoneShowBtns = document.querySelectorAll('.phone-link__show-btn');
  $phoneShowBtns.forEach($btn => {
  $btn.addEventListener('click', e => {
    e.preventDefault();

    const $link = $btn.closest('.phone-link');
    const $value = $link.querySelector('.phone-link__value');
    if (!$link.classList.contains('phone-link_hidden')) {
      return;
    }

    $value.innerText = $link.dataset.phone;

    const tel = $link.dataset.phone.replace(/\s/g, '');
    $link.setAttribute('href', `tel:${tel}`);
    $link.removeAttribute('data-phone');
    $link.classList.remove('phone-link_hidden');

  });
});