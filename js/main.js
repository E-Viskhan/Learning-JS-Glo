'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rollbackRangeInput = document.querySelector('.rollback input[type="range"]');
const rollbackRangeValue = document.querySelector('.rollback span.range-value');

const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];

const totalInputList = document.getElementsByClassName('total-input');
const total = totalInputList[0];
const totalCount = totalInputList[1];
const totalCountOther = totalInputList[2];
const fullTotalCount = totalInputList[3];
const totalCountRollback = totalInputList[4];

let screens = document.querySelectorAll('.screen');
let cleanScreenBlock = screens[0].cloneNode(true);

const appData = {

  title: '',
  screens: [],
  countScreens: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    this.addTitle();

    btnStart.addEventListener('click', this.start.bind(this));
    btnReset.addEventListener('click', this.reset.bind(this));
    buttonPlus.addEventListener('click', this.addScreenBlock);
    rollbackRangeInput.addEventListener('input', this.addRollback.bind(this));
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();

    if (this.checkValues()) {
      this.changeState();
      this.addServices();
      this.addPrices();
      this.showResult();
    }
    else {
      this.clearResult();
      alert('Пожалуйста, заполните поля для ввода экранов');
    }

    this.screens.length = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

  },
  reset: function () {
    this.changeState();
    this.clearResult();

    screens = document.querySelectorAll('.screen').forEach((screen, index) => {
      if (index === (screens.length - 1)) {
        this.addScreenBlock();
      }
      screen.remove();
    });

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

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.ceil((100 - this.rollback) / 100 * this.fullPrice);
  },
  addRollback: function () {
    rollbackRangeValue.textContent = rollbackRangeInput.value + '%';
    this.rollback = +rollbackRangeInput.value;
    if (this.servicePercentPrice !== 0) {
      this.servicePercentPrice = Math.ceil((100 - this.rollback) / 100 * this.fullPrice);
      totalCountRollback.value = this.servicePercentPrice;
    }
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
  changeState: function () {
    const changeDisable = el =>
      (el.hasAttribute('disabled') ? el.removeAttribute('disabled') : el.setAttribute('disabled', 'disabled'));

    const changeDisplay = el =>
      (el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none');


    screens.forEach((screen) => {
      const screenInput = screen.querySelector('input[type=text]');
      const screenSelect = screen.querySelector('select');

      changeDisable(screenInput);
      changeDisable(screenSelect);

    });

    changeDisplay(btnStart);
    changeDisplay(btnReset);
  },
  logger: function () {
    console.log(this.servicePricesPercent);
    console.log(this.fullPrice);
    console.log(this.screens);
    console.log(this.services);
  },
};

appData.init();