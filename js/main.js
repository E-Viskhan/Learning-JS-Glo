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
    appData.addTitle();

    btnStart.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
    rollbackRangeInput.addEventListener('input', appData.addRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: () => {
    appData.addScreens();

    if (appData.checkValues()) {
      appData.addServices();
      appData.addPrices();
      // appData.logger();
      appData.showResult();
    }

  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.countScreens;
    totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;

  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value
      });
    });

  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }

    });

  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (accumulator, currentScreen) {
      return accumulator + currentScreen.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]) / 100;
    }

    appData.countScreens = appData.screens.reduce(function (accumulator, currentScreen) {
      return accumulator + currentScreen.count;
    }, 0);

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.servicePercentPrice = Math.ceil((100 - appData.rollback) / 100 * appData.fullPrice);
  },
  addRollback: function () {
    rollbackRangeValue.textContent = rollbackRangeInput.value + '%';
    appData.rollback = +rollbackRangeInput.value;
    if (appData.servicePercentPrice !== 0) {
      appData.servicePercentPrice = Math.ceil((100 - appData.rollback) / 100 * appData.fullPrice);
      totalCountRollback.value = appData.servicePercentPrice;
    }
  },
  // getServicePercentPrice: () => {
  //   appData.servicePercentPrice = Math.ceil((100 - appData.rollback) / 100 * appData.fullPrice);
  // },
  checkValues: function () {
    let isCorrect = true;
    appData.screens.forEach(function (screen) {
      if (screen.price <= 0) {
        isCorrect = false;
      }
    });
    return isCorrect;
  },
  logger: () => {
    console.log(appData.servicePricesPercent);
    console.log(appData.fullPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
};

appData.init();