const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://admin.preorder.technaxis.com/place/profile', {waitUntil: 'networkidle2'});//ждем пока станица не загрузится

    await page.waitFor('a[href=/place/orders]]');//ждем показагрузится этот элемент
    await page.waitFor(1000);//ждем 1000милисек
    await page.click('a[href=/place/orders]]');

    await page.waitFor(5000);//ждем 1000милисек



    // await page.waitFor('input[formcontrolname=login]');//ждем пока на странцие page не загрузится поле input[formcontrolname=login]
    // //await page.focus('input[formcontrolname=login]');//утсанавливаем фокус в поле
    // await page.click('input[formcontrolname=login]');
    // await page.waitFor(1000);//ждем 1000милисек
    // await page.$eval('input[formcontrolname=login]', el1 => el1.value = 'superadmin@mail.ru');//вводм в поле  значение istambul@gmail.com
    // await page.keyboard.press('Enter');//жмем Ентер
    //
    // await page.waitFor('input[formcontrolname=password]');//ждем пока не загрузится  поле input[formcontrolname=password]
    // await page.click('input[formcontrolname=password]');
    // //await page.focus('input[formcontrolname=password]');//утсанавливаем фокус в поле
    // await page.waitFor(1000);//ждем 1000милисек
    // await page.$eval('input[formcontrolname=password]', el2 => el2.value = 'password');
    // await page.keyboard.press('Enter');//жмем Ентер
    // await page.waitFor(1000);//ждем 1000милисек
    //
    // // await page.type('input[name=search]', 'Adenosine triphosphate');
    //
    //
    // await page.click('.fullWidth');  //ищем кнпоку  button[type="button"] и кликаем по ней
    // await page.click('.fullWidth');
    //
    // await page.waitFor(1000);//ждем 3000милисек чтобы браузр сразу не закрылся
    // await page.click('mat-spinner-button[class="holder-button"]');  //ищем кнпоку  button[type="button"] и кликаем по ней
    // console.log('кликнули на кнпоку');
    // //await page.keyboard.press('Enter');//жмем Ентер
    // await page.waitFor(4000);
    // console.log('тест прошел с успехом');// вывоим резльтат котрый хрнаится в переменной text в консосль
    // await page.waitFor(4000);
    await browser.close();
})();
