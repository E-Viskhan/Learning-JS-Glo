'use strict';

const title = document.getElementsByTagName('h1')[0];
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rollbackRangeInput = document.querySelector('.rollback input[type="range"]');
const rollbackRangeValue = document.querySelector('.rollback span.range-value');
const checkboxes = document.querySelectorAll('.custom-checkbox');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.getElementById('cms-select');
const percentForCms = document.querySelector('.hidden-cms-variants .main-controls__input');
const percentCmsInput = percentForCms.querySelector('input');
const cmsOpen = document.getElementById('cms-open');

const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');

const totalInputList = document.getElementsByClassName('total-input');
const total = totalInputList[0];
const totalCount = totalInputList[1];
const totalCountOther = totalInputList[2];
const fullTotalCount = totalInputList[3];
const totalCountRollback = totalInputList[4];

let screens = document.querySelectorAll('.screen');
let cleanScreenBlock = screens[0].cloneNode(true);

const appData = {

  screens: [],
  countScreens: 0,
  screenPrice: 0,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  cmsPercent: 1,
  init: function () {
    this.addTitle();
    this.addEventListeners();
  },
  addEventListeners: function () {
    btnStart.addEventListener('click', this.start.bind(this));
    btnReset.addEventListener('click', this.reset.bind(this));
    buttonPlus.addEventListener('click', this.addScreenBlock);
    cmsSelect.addEventListener('change', this.cmsSelectChange.bind(this));
    rollbackRangeInput.addEventListener('input', this.addRollback.bind(this));
    cmsOpen.addEventListener('change', () => {
      if (cmsOpen.checked) {
        this.show(hiddenCmsVariants, 'flex');
      } else {
        this.hide(hiddenCmsVariants);
      }
    });
  },
  addTitle: () => document.title = title.textContent,
  isNumber: num => !isNaN(parseFloat(num)) && isFinite(num),
  hide: el => el.style.display = 'none',
  show: (el, value = 'block') => el.style.display = value,
  start: function () {
    this.addScreens();

    if (this.checkValues()) {
      this.lockInputs();
      this.addServices();
      this.addPrices();
      this.showResult();
    }
    else {
      this.clearResult();
      alert('Пожалуйста, заполните поля для ввода экранов');
    }
    this.screens.length = 0;
  },
  reset: function () {
    this.hide(btnReset);
    this.show(btnStart);
    this.removeScreens();
    this.getInitState();
    this.clearResult();
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.countScreens;
    totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  clearResult: function () {
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value
      });
    });

  },
  removeScreens: function () {
    screens = document.querySelectorAll('.screen').forEach((screen, index) => {
      if (index === (screens.length - 1)) {
        this.addScreenBlock();
      }
      screen.remove();
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }

    });

  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen');
    screens[screens.length - 1].after(cleanScreenBlock.cloneNode(true));
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((accumulator, currentScreen) => {
      return accumulator + currentScreen.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]) / 100;
    }

    this.countScreens = this.screens.reduce((accumulator, currentScreen) => {
      return accumulator + currentScreen.count;
    }, 0);

    this.cmsPercent += (this.isNumber(percentCmsInput.value) ? Number(percentCmsInput.value) : 0) / 100;

    this.fullPrice = Math.trunc((this.screenPrice + this.servicePricesNumber + this.servicePricesPercent) * this.cmsPercent);

    this.servicePercentPrice = Math.trunc((100 - this.rollback) / 100 * this.fullPrice);
  },
  addRollback: function () {
    rollbackRangeValue.textContent = rollbackRangeInput.value + '%';
    this.rollback = +rollbackRangeInput.value;
    this.servicePercentPrice = Math.ceil((100 - this.rollback) / 100 * this.fullPrice);
    totalCountRollback.value = this.servicePercentPrice;
  },
  checkValues: function () {
    let isCorrect = true;
    this.screens.forEach((screen) => {
      if (screen.price <= 0) {
        isCorrect = false;
      }
    });
    return isCorrect;
  },
  changeDisable: el => {
    el.hasAttribute('disabled') ? el.removeAttribute('disabled') : el.setAttribute('disabled', 'disabled');
  },
  cmsSelectChange: function () {
    if (this.isNumber(cmsSelect.value)) {
      this.hide(percentForCms);
      this.cmsPercent += Number(cmsSelect.value) / 100;
    }
    else if (cmsSelect.value === 'other') {
      this.show(percentForCms, 'flex');
    }
    else if (cmsSelect.value.trim() === '') {
      this.hide(percentForCms);
      this.cmsPercent = 1;
    }
  },
  lockInputs: function () {
    screens.forEach((screen) => {
      const screenInput = screen.querySelector('input[type=text]');
      const screenSelect = screen.querySelector('select');

      this.changeDisable(screenInput);
      this.changeDisable(screenSelect);
    });

    checkboxes.forEach((checkbox) => {
      this.changeDisable(checkbox);
    });

    this.changeDisable(cmsSelect);
    this.changeDisable(percentCmsInput);
    this.changeDisable(buttonPlus);

    this.hide(btnStart);
    this.show(btnReset);
  },
  getInitState: function () {
    checkboxes.forEach((checkbox) => {
      this.changeDisable(checkbox);
      checkbox.checked = false;
    });

    this.changeDisable(cmsSelect);
    this.changeDisable(percentCmsInput);
    this.changeDisable(buttonPlus);

    this.hide(percentForCms);
    this.hide(hiddenCmsVariants);

    cmsSelect.selectedIndex = 0;
    percentCmsInput.value = '';
    rollbackRangeInput.value = 0;
    rollbackRangeValue.textContent = '0%';

    this.screens.length = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    this.fullPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.rollback = 0;
    this.cmsPercent = 1;
  },
  logger: function () {
    for (let item in appData) {
      console.log(typeof appData[item] !== "function" ? `${item} = ${appData[item]}` : 'skip function');
    }
  },
};

appData.init();