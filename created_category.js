const puppeteer = require('puppeteer');

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });//чобы видеть как проходт тест
  const page = await browser.newPage();/*открываем вклдаку браузера*/

  await page.goto('https://admin.deala.technaxis.com/external/login', {waitUntil: 'networkidle2'});
  //await page.setViewport({width: 1440, height: 1300});
  await page.waitForSelector('input[formcontrolname=email]');// ждет пока не появится этот элемент
  await page.type("input[formcontrolname=email]", "qatechnaxis@yandex.ru");//вводим в поле значение some45@mail.ru

  await page.waitFor(1000);//ждем 1000милисек

  await page.waitForSelector('input[type=password]');// ждет пока не появится этот элемент
  await page.type("input[type=password]", "password");//вводим в поле значение Passw._90eertre
  await page.waitFor(1000);//ждем 1000милисек

  await page.waitForSelector('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]');// ждет пока не появится этот элемент
  await page.$eval('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); //жмем на кнопку
  await page.waitFor(1000);//ждем 1000милисек


 //перешли на главную станицу
  await page.waitForSelector('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]');// ждет пока не появится этот элемент кнопка Add coupon

  await page.waitFor(1000);//ждем 1000милисек

  await page.$eval('a[href="/categories"]', el => el.click()); // жмем на раздел Merchants
  await page.waitFor(6000);

  await page.$eval('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]', el => el.click());//жмем на кнопку Add merchant
  await page.waitFor(1000);//ждем 1000милисек


  //console.log('list_of_inputs_title' + list_of_inputs_title);
  const list_of_title_inputs = await page.$$('input[formcontrolname=title]');//списко полей названий
  await page.type("input[formcontrolname=title]", "Do");//вводим в поле значение name of category
  await page.waitFor(1000);//ждем 1000милисек


  //await page.type("mat-select[formcontrolname=level]", "I");//вводим в поле значение name of category
  //await page.waitFor(2000);//ждем 1000милисек
  await page.$eval('mat-select[formcontrolname=level]', el => el.click());//кликаем на поле, тем самым поставится фокус на поле
  await page.waitFor(1000);


  //-------------------
  const list_of_items = await page.$$('span[class="mat-option-text"]');// массив два айтемав спсике
  const i = 0;//randomIntFromInterval(0, 1);//выбирате либо 0,  либо1
  list_of_items[i].click();

  if (i == 1){//выбираем 2ый уровень
    const list_of_radiobuttons = await page.$$('div[class="mat-radio-outer-circle"]');// массив радиокнопок, спсисок
    list_of_radiobuttons[randomIntFromInterval(0, list_of_radiobuttons.length-1)].click();//выбираем рандомный радиокнопку
    await page.waitFor(1000);
  }
  else {//выбираем 1ый уровень
    await page.waitFor(1000);
    const list_of_checkbox= await page.$$('mat-checkbox[class="mat-checkbox similar-category mat-primary"]');// массив чекбоксов в similar subcategories                                              mat-checkbox similar-category mat-primary
    for (let i = 0; i < list_of_checkbox.length-1; i++) {
      list_of_checkbox[i].click();//
    }
  }


  //---------------------------------

  await page.$eval('button[type=submit]', el => el.click()); // жмем на кнопку Add
  await page.waitFor(2000);//ждем 2000милисек

  console.log(await browser.version());

  await page.$eval('button[class="mat-focus-indicator gl-popup-btn-action btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); //жмем на кнопку Add в попапе
  await page.waitFor(7000);
  await browser.close();

})();
