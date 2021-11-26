let title = "Расчет стоимости работы";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 5000;
let rollback = 15;
let fullPrice = 100000;
let adaptive = true;

// Вывод в консоль типов данных переменных
console.log("Тип данных для переменной title:", typeof title);
console.log("Тип данных для переменной fullPrice:", typeof fullPrice);
console.log("Тип данных для переменной adaptive:", typeof adaptive);

// Вывод в консоль длину строки screens
console.log("Длина строки переменной screens:", screens.length);

// Вывод в консоль стоимости верстки экранов и стоимость верстки сайта
console.log(`Стоимость верстки экранов ${screenPrice} рублей и стоимость разработки сайта ${fullPrice}`);

// Приведение строки screens к нижнему регистру, разбиение строки на массив, выведение массива в консоль
screens = screens.toLowerCase(); // приведение в нижний регистр
screens = screens.split(', '); // разбиение строки по запятым с пробелом
console.log(screens);

// Вывод в консоль процента отката посреднику за работу (fullPrice * (rollback/100))
console.log("Процент отката:", fullPrice * (rollback / 100));