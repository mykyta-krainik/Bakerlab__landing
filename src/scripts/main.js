'use strict';

window.addEventListener('hashchange', event => {
  if (window.location.hash === '#menu') {
    document.body.classList.add('page__body--with-menu');
  } else {
    document.body.classList.remove('page__body--with-menu');
  }
});

function SelectedProduct(productLink, product) {
  this.productLink = productLink;
  this.product = product;
}

const productsSection = document.getElementById('products');
const discountsSection = document.getElementById('discounts');

const selectedProduct = new SelectedProduct(
  productsSection.querySelector('.products__name--selected-desktop'),
  productsSection.querySelector('.products__product-cards--selected-desktop')
);
const selectedDiscountedProduct = new SelectedProduct(
  discountsSection.querySelector('.products__name--selected-desktop'),
  discountsSection.querySelector('.products__product-cards--selected-desktop')
);

const main = document.querySelector('.main');

main.addEventListener('click', event => {
  const productLink = event.target.closest('.products__name');

  if (
    !productLink
    || !productLink.closest('.products')
    || selectedProduct.productLink === productLink
  ) {
    return;
  }

  event.preventDefault();

  const productId = productLink.getAttribute('href').slice(1);

  if (!productId) {
    return;
  }

  const productCards = document.getElementById(productId);

  if (!productCards) {
    return;
  }

  // If it's a mobile or tablet
  if (document.documentElement.clientWidth < 1200) {
    productLink.classList.toggle('products__name--selected');
    productCards.classList.toggle('products__product-cards--selected');

    return;
  }

  // If it's a desktop

  // If click happens on the discounts section
  if (productId.startsWith('discounted-')) {
    removeSelectedProduct(selectedDiscountedProduct);
    addSelectedProduct(selectedDiscountedProduct);

    return;
  }

  // If click happens on the products section
  removeSelectedProduct(selectedProduct);
  addSelectedProduct(selectedProduct);

  function removeSelectedProduct(product) {
    if (product.productLink && product.product) {
      product
        .productLink
        .classList
        .remove('products__name--selected-desktop');

      product
        .product
        .classList
        .remove('products__product-cards--selected-desktop');
    }
  }

  function addSelectedProduct(product) {
    productLink.classList.add('products__name--selected-desktop');
    productCards.classList.add('products__product-cards--selected-desktop');

    product.productLink = productLink;
    product.product = productCards;
  }
});
