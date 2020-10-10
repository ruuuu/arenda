const puppeteer = require('puppeteer');//



function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  //const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });//чобы видеть как проходт тест
  const page = await browser.newPage();/*открываем вклдаку браузера*/
  //await page.setViewport({width: 1440, height: 1300});

  await page.setUserAgent('Chrome/84.0.4147.89');

  await page.goto('https://admin.deala.technaxis.com/external/login', {waitUntil: 'networkidle2'});

  await page.waitForSelector('input[formcontrolname=email]');// ждет пока не появится этот элемент
  await page.type("input[formcontrolname=email]", "qatechnaxis@yandex.ru");//вводим в поле значение some45@mail.ru

  await page.waitFor(1000);//ждем 1000милисек

  await page.waitForSelector('input[type=password]');// ждет пока не появится этот элемент
  await page.type("input[type=password]", "password");//вводим в поле значение Passw._90eertre
  await page.waitFor(1000);//ждем 1000милисек

  await page.waitForSelector('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]');// ждет пока не появится этот элемент
  await page.$eval('button[class="mat-focus-indicator btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); //жмем на кнопку
  await page.waitFor(1000);//ждем 3000милисек


 //перешли на главную станицу
  await page.waitForSelector('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]');// ждет пока не появится этот элемент кнопка Add coupon

  await page.waitFor(1000);//ждем 2000милисек

  await page.$eval('a[href="/merchants"]', el => el.click()); // жмем на раздел Merchants
  await page.waitFor(6000);

  await page.$eval('button[class="mat-focus-indicator button gl-btn mat-flat-button mat-button-base mat-primary ng-star-inserted"]', el => el.click());//жмем на кнопку Add merchant
  await page.waitFor(3000);//ждем 3000милисек

  //const list_of_radiobuttons = await page.$$('div[class="mat-radio-outer-circle"]');// массив радиокнопко, их две штуки //
  //k = randomIntFromInterval(0, 1);
  //list_of_radiobuttons[k].click(); /*выбираем из псика 2рандомный элемент*/
  //await page.waitFor(2000);//ждем 2000милисек
//  if (k == 1){
    //await page.type("input[formcontrolname=affiliateLink]", "https://ghrtht.yu");//вводим в поле значение hdjfhk sdfksdf

  //}

  await page.type("input[formcontrolname=title]", "Merchant78");//вводим в поле название магалина
  await page.waitFor(2000);//ждем 2000милисек

  await page.type("input[formcontrolname=link]", "https://mythfghg.yu");//вводим в поле название магалина
  await page.waitFor(2000);//ждем 2000милисек

  await page.type("input[formcontrolname=alias]", "https://mythfgh342g.yu");//вводим в поле название магалинаformcontrolname=alias

  //загрузка логотипа:
  const file_dicitionary = ['/Users/rufina/Desktop/dishs/4703.jpg',
                          '/Users/rufina/Desktop/dishs/Restaurant-desember-news-07-696x522.jpg',
                          '/Users/rufina/Desktop/dishs/sup-strachatella.png',
                          '/Users/rufina/Desktop/dishs/salat_kinoa.jpg__1499258543__50030.jpg',
                          '/Users/rufina/Desktop/dishs/527_768x764_80f.jpg',
                          '/Users/rufina/Desktop/dishs/salat-gril-300x300.jpg',
                          '/Users/rufina/Desktop/dishs/1505752856_1.jpeg',
                          '/Users/rufina/Desktop/dishs/450x300 (1).jpeg'
                        ]




await page.waitForSelector('input[type=file]');
await page.waitFor(1000);

const inputUploadHandle = await page.$('input[type=file]');

//console.log('index equal' + randomIntFromInterval(0, 7));
//let fileToUpload = '/Users/rufina/Desktop/dishs/4703.jpg';
let fileToUpload = file_dicitionary[randomIntFromInterval(0, file_dicitionary.length-1)];//берет рандомный файл из псика

inputUploadHandle.uploadFile(fileToUpload);
  //await fileChooser.accept(['/Users/rufina/Desktop/dishs/4703.jpg']);
  //const elementHandle = await page.$("input[type=file]");
  //await elementHandle.uploadFile('file_dicitionary[0]');
  //await page.waitFor(2000);//ждем 2000милисек

  await page.type("div[data-placeholder=Description]", "jkdkhg drgjsk ghej hejks fesfe");//вводим в поле Description  значение
  await page.waitFor(2000);//ждем 2000милисек


  const list_of_checkboxes = await page.$$('mat-checkbox[class="mat-checkbox category mat-primary"]');//список чекбокосв
  for(let i = 0; i < list_of_checkboxes.length; i++){
    list_of_checkboxes[i].click(); /*выбираем из псика iой элемент*/
    await page.waitFor(1000);//ждем 2000милисек
    if (i == 2){
      break;
    }
  }

  await page.waitFor(1000);//ждем 2000милисек
  //const lastPosition1 = await scrollPageToBottom(page);

  //await page.$eval('input[role=switch]', el => el.click()); // жмем наТогглер  Show in top stores
  //await page.waitFor(2000);//ждем 2000милисек

  //const lastPosition = await scrollPageToBottom(page);

  await page.$eval('button[type=submit]', el => el.click()); // жмем на кнопку Add
  await page.waitFor(2000);//ждем 2000милисек

  console.log(await browser.version());

  await page.$eval('button[class="mat-focus-indicator gl-popup-btn-action btn-submit gl-btn mat-flat-button mat-button-base mat-primary"]', el => el.click()); ////жмем на кнопку Add в попапе

  await page.waitFor(7000);//ждем 7000милисек
  await browser.close();

})();
