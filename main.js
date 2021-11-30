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

const getAllServicePrices = function (firstPrice, secondPrice) {
  return firstPrice + secondPrice;
};

function getFullPrice(mainPrice, ServicePrices) {
  return mainPrice + ServicePrices;
}

const getTitle = (projectTitle) => {
  projectTitle = projectTitle.toLowerCase().trim();
  projectTitle = projectTitle[0].toUpperCase() + projectTitle.slice(1);
  return projectTitle;
};

const getServicePercentPrices = (costWork, percentRollback) => {
  return Math.ceil((100 - percentRollback) / 100 * costWork);
};

let allServicePrices = getAllServicePrices(firstServicePrice, secondServicePrice);
let fullPrice = getFullPrice(screenPrice, allServicePrices);
let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

screens = screens.toLowerCase();
screens = screens.split(', ');

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log('Итоговая стоимость, за вычетом отката посреднику:', servicePercentPrice);