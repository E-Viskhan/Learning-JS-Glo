'use strict';

const appData = {

  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  firstService: '',
  secondService: '',

  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
    appData.screenPrice = appData.setNumberFromPrompt('Сколько будет стоить данная работа?');
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  isNumber: (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let servicePrice;
      if (i === 0) {
        appData.firstService = prompt('Какой дополнительный тип услуги нужен?');
      } else if (i === 1) {
        appData.secondService = prompt('Какой дополнительный тип услуги нужен?');
      }

      servicePrice = appData.setNumberFromPrompt('Сколько это будет стоить?');
      sum += servicePrice;
    }

    return sum;
  },

  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },

  setNumberFromPrompt: (messageForUser) => {
    let number;

    do {
      number = prompt(messageForUser);
    } while (!appData.isNumber(number));

    return parseFloat(number);
  },

  getServicePercentPrice: () => {
    return Math.ceil((100 - appData.rollback) / 100 * appData.fullPrice);
  },

  getTitle: () => {
    appData.title = appData.title.toLowerCase().trim();
    appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
    return appData.title;
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

    for (let item in appData) {
      console.log(item, appData[item]);
    }
  },

  start: () => {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrice();
    appData.title = appData.getTitle();

    appData.logger();
  }
};

appData.start();