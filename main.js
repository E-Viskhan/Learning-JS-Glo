let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let rollback = 10;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let firstService = prompt('Какой дополнительный тип услуги нужен?');
let firstServicePrice = +prompt('Сколько это будет стоить?');
let secondService = prompt('Какой дополнительный тип услуги нужен?');
let secondServicePrice = +prompt('Сколько это будет стоить?');

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
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

const getAllServicePrices = function () {
  return firstServicePrice, secondServicePrice;
};

function getFullPrice() {
  return screenPrice, allServicePrices;
}

const getTitle = () => {
  title = title.toLowerCase().trim();
  title = title[0].toUpperCase() + title.slice(1);
  return title;
};

const getServicePercentPrices = () => {
  return Math.ceil((100 - rollback) / 100 * fullPrice);
};

let allServicePrices = getAllServicePrices();
let fullPrice = getFullPrice();
let servicePercentPrice = getServicePercentPrices();

screens = screens.toLowerCase();
screens = screens.split(', ');

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log('Итоговая стоимость, за вычетом отката посреднику:', servicePercentPrice);