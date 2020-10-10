const puppeteer = require('puppeteer');


let authorization = async (page) => {//метод авторзации
  await page.waitFor(1000);//ждем 1000милисек
  await page.waitFor('input[formcontrolname=login]');//ждем пока на странцие page не загрузится поле input[formcontrolname=login]


  await page.type("input[formcontrolname=login]", "superadmin@mail.ru"); //будет вводить символы в поле вовда с  задержкой в 100 милисекунд {delay:100}
  await page.waitFor(1000);//ждем 1000милисек



  await page.waitFor('input[formcontrolname=password]');//ждем пока не загрузится  поле input[formcontrolname=password]

  await page.waitFor(1000);//ждем 1000милисек
  await page.type("input[formcontrolname=password]", "password");

  await page.waitFor(1000);//ждем 1000милисек




 //или можно так:
  //const [button] = await page.$x("//button[contains(., 'Войти')]");  //ищет элемент (в даннос случае кнпоку) накотром есть надпись Войти
  //if (button) { //если кнпока существет то нажмет
     //await button.click();
   //}

  //или можно так:
  //await page.$eval('span[class="button-text ng-star-inserted"]', el => el.click()); //находит элемент

 //или можно так:
  await page.$eval('button[class="mat-button mat-primary fullWidth mat-flat-button"]', el => el.click());


}


function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



let run = async () => { //метод main
  // можно начать с этого (async () => или async function run()
    //const browser = await puppeteer.launch({headless: false, args: ['--window-size=2440,1900']}); //устанавивает аразмеры браузера
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://admin.preorder.technaxis.com/external/login');//ждем пока станица не загрузится
    //await page.setViewport({width: 1500, height: 1200});
    //await page.setViewport({width: 1500, height: 2800});//устанавливаем размер окна браузера



    await  authorization(page);// выызваем функцию  authorization автризации котрая  выше
    await page.waitFor(4000);// ждем пок азагрузится страница


    //на станице ысех завдеений
    //await page.$('a[href="/superadmin/ptomotions"]')
    await page.$eval('a[href="/superadmin/notifications-create"]', el => el.click()); // жмем на раздел Создание уведомлений
    await page.waitFor(2000);


    await page.type('input[formcontrolname="title"]', "новое уведомление для всех");//

    await page.waitFor(2000);

    await page.type('div[data-placeholder="Текст уведомления..."]', "длинный текст уведомления");//


    await page.waitFor(2000);

    await page.$eval('span[class="button-text ng-star-inserted"]', el => el.click()); // жмем кнопку Отправить
    await page.waitFor(2000);

    await page.$eval('button[class="mat-button mat-primary fullWidth mat-flat-button"]', el => el.click()); //жмем в паопе кнопку Добавить




   await page.waitFor(4000);//чбы сращу браузер не закрылся
   return browser.close();//await browser.close();
}


const logErrorAndExit = err => {
  console.log(err);
  //console.log("result: " + value);
  process.exit();
};



run().catch(logErrorAndExit);//вызываем функцию run() котраяв ыше
