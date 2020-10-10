const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://admin.preorder.technaxis.com/external/login');//ждем пока станица не загрузится
    await page.setViewport({width: 1500, height: 900});//устанавливаем размер окна браузера

    await page.waitFor('input[formcontrolname=login]');//ждем пока на странцие page не загрузится поле input[formcontrolname=login]


    //await page.focus('input[formcontrolname=login]');//утсанавливаем фокус в поле
    //await page.click('input[formcontrolname=login]');
    await page.waitFor(1000);//ждем 1000милисек
    await page.$eval('input[formcontrolname=login]', el1 => el1.value = 'superadmin@mail.ru');//вводм в поле  значение istambul@gmail.com, но этот метод ввода значеняи вполе  для нас не рабоатет!!!!


    await page.waitFor('input[formcontrolname=password]');//ждем пока не загрузится  поле input[formcontrolname=password]
    //await page.click('input[formcontrolname=password]');
    //await page.focus('input[formcontrolname=password]');//утсанавливаем фокус в поле
    await page.waitFor(1000);//ждем 1000милисек
    await page.$eval('input[formcontrolname=password]', el2 => el2.value = 'password');
    //await page.keyboard.press('Enter');//жмем Ентер
    await page.waitFor(1000);//ждем 1000милисек

    // await page.type('input[name=search]', 'Adenosine triphosphate');


    //await page.click('.fullWidth');  //ищем кнпоку  button[type="button"] и кликаем по ней
    //await page.click('.fullWidth');

    await page.waitFor(1000);//ждем 3000милисек чтобы браузр сразу не закрылся
    //await page.click('mat-spinner-button[class="holder-button"]');  //ищем кнпоку  button[type="button"] и кликаем по ней
    //await page.click('button[type="button"]');

    //await page.waitForSelector('button[type="button"]');
    //await page.$$('button.mat-button mat-primary fullWidth mat-flat-button');


    await page.waitFor(4000);


   //или можно так:
    //const [button] = await page.$x("//button[contains(., 'Войти')]");  //ищет элемент (в даннос случае кнпоку) накотром есть надпись Войти
    //if (button) { //если кнпока существет то нажмет
       //await button.click();
     //}

    //или можно так:
    await page.$eval('span[class="button-text ng-star-inserted"]', el => el.click()); //находит элемент

    await page.$eval('span[class="button-text ng-star-inserted"]', el => el.click()); //находит элемент

    //await page.keyboard.press('Enter');//жмем Ентер
    //await page.waitFor(4000);
    //console.log('тест прошел с успехом');// вывоим резльтат котрый хрнаится в переменной text в консосль

    await page.waitFor(4000);
    await browser.close();
})();
