let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let rollback = 15;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let firstServie = prompt('Какой дополнительный тип услуги нужен?');
let firstServiePrice = +prompt('Сколько это будет стоить?');
let secondServie = prompt('Какой дополнительный тип услуги нужен?');
let secondServiePrice = +prompt('Сколько это будет стоить?');
let fullPrice = screenPrice + firstServiePrice + secondServiePrice;
let servicePercentPrice = Math.ceil((100 - rollback) / 100 * fullPrice);

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

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

screens = screens.toLowerCase();
screens = screens.split(', ');

console.log('Итоговая стоимость, за вычетом отката посреднику:', servicePercentPrice);
console.log(`Стоимость верстки экранов ${screenPrice} рублей и стоимость разработки сайта ${fullPrice}`);
console.log("Сумма отката:", fullPrice * (rollback / 100));
console.log(getRollbackMessage(fullPrice));

console.log("Длина строки переменной screens:", screens.length);
console.log(screens);