'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let firstService;
let secondService;
let servicePrice;

const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const setNumberFromPrompt = (messageForUser) => {
  let number;

  do {
    number = prompt(messageForUser);
  } while (!isNumber(number));

  return parseFloat(number);
};

const asking = () => {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
  screenPrice = setNumberFromPrompt('Сколько будет стоить данная работа?');
  adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      firstService = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      secondService = prompt('Какой дополнительный тип услуги нужен?');
    }

    servicePrice = setNumberFromPrompt('Сколько это будет стоить?');
    sum += servicePrice;
  }

  return sum;
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getServicePercentPrice = () => {
  return Math.ceil((100 - rollback) / 100 * fullPrice);
};

const getTitle = () => {
  title = title.toLowerCase().trim();
  title = title[0].toUpperCase() + title.slice(1);
  return title;
};

const getRollbackMessage = function (price) {
  if (price <= 0) {
    return 'Что то пошло не так';
  } else if (price > 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else {
    return 'Даем скидку в 10%';
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

screens = screens.toLowerCase();
screens = screens.split(', ');

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log('Итоговая стоимость, за вычетом отката посреднику:', servicePercentPrice);

console.log("allServicePrices", allServicePrices);
