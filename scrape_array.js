const puppeteer = require('puppeteer');

let scrape = async () => { //объявление функции  scrape()

    const browser  = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    await page.setViewport({width: 1440, height: 900});//устанавливаем размер окна браузера
    await page.waitFor(1000); //1000 милисекунд  задержку в 1000 миллисекунд для того, чтобы дать браузеру время на полную загрузку страницы

    page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img') //кликаем по элементу, который выцарапываем по селектору

    const result = await page.evaluate(() => { // резльтат метода  page.evaluate(() записывается в константу result
      let data = []; // Создаём пустой массив,  в него будем складывать объекты вида {title:'', price:''} то есть [{title:'', price:''},{title:'', price:''},{title:'', price:''},{title:'', price:''},{title:'', price:''},{title:'', price:''}]
      let elements = document.querySelectorAll('.product_pod');//  список элементов,  у котрых класс .product_pod
      console.log(elements);

      for (var element of elements){ //проходимся по каждой карточке товара element из спсика товаров elements
          let title = element.childNodes[5].innerText; //взяли у (элемент) по тегу и свойством innerText забираем текст элемнта h1 и зписали этот текст
          //в переменную  title


          let price = element.childNodes[7].children[0].innerText;  //выбираем элемент  .price_color и забираем у него текст и записываем в переменную price
          data.push({title, price}); // Помещаем обект {{title, price}} в массив data
      }



         return data;//функция возвращает массив объектов


      });

  await page.waitFor(1000);//ждем 3000милисек
  browser.close();
  return result;// возвращает значение функции page.evaluate(())

};

scrape().then((value) => { // вызов функции  scrape(), value это то что вернула эта функция
    console.log(value); // вывоим в консоль то что вернула функция
});
