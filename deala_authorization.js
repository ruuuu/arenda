const puppeteer = require('puppeteer');

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
    await page.waitFor(1000);//ждем 1000милисек
    await browser.close();

})();
