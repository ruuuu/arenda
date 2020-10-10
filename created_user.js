const puppeteer = require('puppeteer');

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


(async () => {
  const browser = await puppeteer.launch({headless: false});//чобы видеть как проходт тест
  const page = await browser.newPage();/*открываем вклдаку браузера*/
  await page.goto('https://admin.deala.technaxis.com/external/login', {waitUntil: 'networkidle2'});

  await page.waitForSelector('input[formcontrolname=email]');// ждет пока не появится этот элемент
  await page.type("input[formcontrolname=email]", "qatechnaxis@yandex.ru");//вводим в поле значение some45@mail.ru

  await page.waitFor(1000);//ждем 1000милисек

  await page.waitForSelector('input[type=password]');// ждет пока не появится этот элемент
  await page.type("input[type=password]", "password");//вводим в поле значение password
  await page.waitFor(1000);//ждем 1000милисек


  await page.waitForSelector('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]');// ждет пока не появится этот элемент
  await page.$eval('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); //жмем на кнопку
  await page.waitFor(3000);//ждем 3000милисек

 //перешли на главную станицу
  await page.waitForSelector('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]');// ждет пока не появится этот элемент кнопка Add user

  await page.$eval('a[href="/users"]', el => el.click()); // жмем на раздел Sources
  await page.waitFor(3000);


  await page.$eval('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]', el => el.click());//жмем на кнопку Add coupon
  await page.waitFor(3000);//ждем 3000милисек

 //------
  await page.type("input[formcontrolname=title]", "");//вводим в поле значение name of source
  await page.waitFor(1000);//ждем 1000милисек

  await page.type("input[formcontrolname=link]", "http://fgdfg45df.tytur");//вводим в поле значение
  await page.waitFor(1000);//ждем 1000милисек

  await page.$eval('mat-select[role=listbox]', el => el.click()); // жмем на Список
  await page.waitFor(1000);//ждем 1000милисек
  const list_of_options = await page.$$('mat-option[role=option]');// массив элементов спсика

  list_of_options[randomIntFromInterval(0,1)].click();//кликаем рандомный айтем


  await page.waitFor(3000);

  await page.$eval('button[type=submit]', el => el.click());//жмем на кнопку Add
  await page.waitFor(1000);//ждем 1000милисек


  await page.$eval('button[class="mat-focus-indicator gl-popup-btn-action btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); ////жмем на кнопку Add в попапе
  await page.waitFor(5000);//ждем 1000милисек
  await browser.close();

})();
