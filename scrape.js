const puppeteer = require('puppeteer');

let scrape = async () => { //объявление функции  scrape()

    const browser  = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    await page.setViewport({width: 1440, height: 900});//устанавливаем размер окна браузера
    await page.waitFor(1000); //1000 милисекунд  задержку в 1000 миллисекунд для того, чтобы дать браузеру время на полную загрузку страницы

    page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img') //кликаем по элементу, который выцарапываем по селектору

    //перешли на станицу  с товаром
    const result = await page.evaluate(() => { // резльтат метода  page.evaluate(() записывается в константу result
       let title = document.querySelector('h1').innerText; //взяли элемент по тегу и свойством innerText забираем текст элемнта h1 и зписали этот текст в переменную  title
       let price = document.querySelector('.price_color').innerText; //выбираем элемент с классом .price_color и забираем у него текст и записываем в переменную price

       return { //функция возвращает объект с полями title и price
         title,
         price
       }

      });

  await page.waitFor(1000);//ждем 3000милисек
  browser.close();
  return result;// возвращает значение функции page.evaluate(())

};

scrape().then((value) => { // вызов функции  scrape(), value это то что вернула эта функция
    console.log(value); // вывоим в консоль то что вернула функция
});
