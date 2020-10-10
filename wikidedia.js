const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();/*открываем вклдаку браузера*/
    await page.goto('https://en.wikipedia.org', {waitUntil: 'networkidle2'});

    await page.waitFor('input[name=search]');

    // await page.type('input[name=search]', 'Adenosine triphosphate');
    await page.$eval('input[name=search]', el => el.value = 'Adenosine triphosphate');//вводм с поле поиска значение Adenosine triphosphate

    await page.click('input[type="submit"]');//ищем кнпоку  икликаем пон ей
    await page.waitForSelector('#mw-content-text'); //ждем пока не появится форма с полем id=mw-content-text

    const text = await page.evaluate(() => { //результат мтода запсиыватеся в контанту text
        const anchor = document.querySelector('#mw-content-text');
        return anchor.textContent; //результат фунции запишется  в константу text
    });


    console.log(text);// вывоим резльтат в консосль
    await browser.close();
})();
