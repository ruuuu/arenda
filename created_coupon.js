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
  await page.type("input[type=password]", "password");//вводим в поле значение Passw._90eertre
  await page.waitFor(1000);//ждем 1000милисек

  await page.waitForSelector('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]');// ждет пока не появится этот элемент
  await page.$eval('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); //жмем на кнопку
  await page.waitFor(3000);//ждем 3000милисек


 //перешли на главную станицу
  await page.waitForSelector('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]');// ждет пока не появится этот элемент кнопка Add coupon

  await page.waitFor(2000);//ждем 6000милисек
  await page.$eval('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]', el => el.click());//жмем на кнопку Add coupon
  await page.waitFor(2000);//ждем 3000милисек

  await page.waitForSelector('input[formcontrolname=title]');// ждет пока не появится этот элемент
  await page.type("input[formcontrolname=title]", "hdjfhk sdfksdf");//вводим в поле значение hdjfhk sdfksdf
  await page.waitFor(1000);//ждем 2000милисек


  await page.waitForSelector('input[formcontrolname=code]');// ждет пока не появится этот элемент
  await page.type("input[formcontrolname=code]", "YTRFGGJJJHG");//вводим в поле значение YTRFGGJJJHG
  await page.waitFor(1000);//ждем 2000милисек


  await page.$eval('input[aria-haspopup=dialog]', el => el.click());//кликаем на поле, тем самым поставится фокус на поле
  await page.waitFor(1000);

  const inputValue = await page.$eval('input[aria-haspopup=dialog]', el => el.value);
  for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace'); //удаляем посимволльно   поле
  }

  await page.waitFor(1000);
  await page.$eval('button[class="mat-focus-indicator mat-icon-button mat-button-base"]', el => el.click());//жмем на кнопку календаря
  await page.waitFor(1000);

  const list_if_dates = await page.$$('td[class="mat-calendar-body-cell ng-star-inserted"]');//список дат

  list_if_dates[randomIntFromInterval(0,  list_if_dates.length-1)].click(); /*выбираем из списика рандомный элемент */
  await page.waitFor(1000);//ждем 2000милисек


  //await page.$eval('input[class="mat-input-element mat-form-field-autofill-control ng-tns-c100-123 ng-pristine ng-valid cdk-text-field-autofill-monitored ng-touched"]', el => el.click());//жмем на поле Дата(календарь)



  await page.type("div[data-placeholder=Description]", "jkdkhg drgjsk ghej hejks fesfe");//вводим в поле Description  значение
  await page.waitFor(1000);//ждем 2000милисек

  await page.$eval('input[role=combobox]', el => el.click());//кликаем на поле, тем самым поставится фокус на поле
  //await page.type("input[role=combobox]", "Merchant1");//вводим в поле значение MeMerchant1
  await page.waitFor(1000);//ждем 2000милисек

  const list_of_merchants = await page.$$('mat-option[role="option"]');//список дат начала  //массив элементов из выпадающего спсика
  list_of_merchants[randomIntFromInterval(0,  list_of_merchants.length-1)].click(); /*выбираем из псика рандомный  элемент*/
  await page.waitFor(1000);//ждем 2000милисек

  await page.type("mat-select[formcontrolname=source]", "Instagram");//вводим в поле Description  значение
  await page.waitFor(4000);//ждем 2000милисек

  const [button] = await page.$x("//button[contains(., 'Add')]");  //ищет элемент (в даннос случае кнпоку) накотром есть надпись Войти
  if (button) { //если кнпока существет то нажмет
     await button.click();
  }

  await page.waitFor(7000);//ждем 2000милисек
  await browser.close();

})();
