'use strict';

const appData = {

  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  start: () => {
    appData.asking();
    appData.getAllServicePrices();
    appData.getScreenPrice();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();

    appData.logger();
  },

  asking: function () {
    appData.title = appData.setStringFromPromt('Как называется ваш проект?');

    for (let i = 0; i < 2; i++) {
      let name = appData.setStringFromPromt('Какие типы экранов нужно разработать?');
      let price = 0;

      price = appData.setNumberFromPrompt('Сколько будет стоить данная работа?');
      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = appData.setStringFromPromt('Какой дополнительный тип услуги нужен?');
      let price = 0;

      price = appData.setNumberFromPrompt('Сколько это будет стоить?');

      appData.services[(i + 1) + '. ' + name] = +price;
    }
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

  },

  isNumber: (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  isString: (str) => {
    return !(appData.isNumber(str) || str === null || str === undefined);
  },

  getAllServicePrices: function () {
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getScreenPrice: function () {
    appData.screenPrice = appData.screens.reduce(function (accumulator, currentScreen) {
      return accumulator + currentScreen.price;
    }, 0);
  },

  setNumberFromPrompt: (messageForUser) => {
    let number;

    do {
      number = prompt(messageForUser);
    } while (!appData.isNumber(number));

    return parseFloat(number);
  },

  setStringFromPromt: function (messageForUser) {
    let str;

    while (!appData.isString(str)) {
      str = prompt(messageForUser);
    }

    return str;
  },

  getServicePercentPrice: () => {
    appData.servicePercentPrice = Math.ceil((100 - appData.rollback) / 100 * appData.fullPrice);
  },

  getTitle: () => {
    appData.title = appData.title.toLowerCase().trim();
    appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
    appData.title = appData.title;
  },

  getRollbackMessage: function (price) {
    if (price <= 0) {
      return 'Что то пошло не так';
    } else if (price > 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else {
      return 'Даем скидку в 10%';
    }
  },

  logger: () => {
    console.log(appData.allServicePrices);
    console.log(appData.fullPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
};

appData.start();