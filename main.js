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
let discountMessage;

if (fullPrice <= 0) {
  discountMessage = 'Что то пошло не так';
} else if (fullPrice > 0 && fullPrice < 15000) {
  discountMessage = 'Скидка не предусмотрена';
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  discountMessage = 'Даем скидку в 5%';
} else {
  discountMessage = 'Даем скидку в 10%';
}

console.log('Итоговая стоимость, за вычетом отката посреднику:', servicePercentPrice);
console.log(`Стоимость верстки экранов ${screenPrice} рублей и стоимость разработки сайта ${fullPrice}`);
console.log("Сумма отката:", fullPrice * (rollback / 100));
console.log(discountMessage);

// Вывод в консоль типов данных переменных
console.log("Тип данных для переменной title:", typeof title);
console.log("Тип данных для переменной fullPrice:", typeof fullPrice);
console.log("Тип данных для переменной adaptive:", typeof adaptive);

console.log("Длина строки переменной screens:", screens.length);
screens = screens.toLowerCase(); // приведение в нижний регистр
screens = screens.split(', '); // разбиение строки по запятым с пробелом
console.log(screens);