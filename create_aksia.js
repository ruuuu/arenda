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
    await page.$eval('a[href="/superadmin/promotions"]', el => el.click()); // жмем на раздел Акции
    await page.waitFor(2000);

    await page.$eval('button[class="header-action-button mat-flat-button mat-primary ng-star-inserted"]', el => el.click());//Жмем кнопкe Добавить
    await page.waitFor(2000);

    //загрузка логотипа:
    const file_dicitionary = {0: "/Users/rufina/Desktop/dishs/salute.jpg",
                            1: "/Users/rufina/Desktop/dishs/Restaurant-desember-news-07-696x522.jpg", 2: "/Users/rufina/Desktop/dishs/bd33ed99edcb4638b5750bc45add91cd.JPG",
                            3: "/Users/rufina/Desktop/dishs/salat_kinoa.jpg__1499258543__50030.jpg",
                            4: "/Users/rufina/Desktop/dishs/527_768x764_80f.jpg", 5: "/Users/rufina/Desktop/dishs/salat-gril-300x300.jpg",
                            6: "/Users/rufina/Desktop/dishs/1505752856_1.jpeg",
                            7: "/Users/rufina/Desktop/dishs/450x300 (1).jpeg",
                            8:"/Users/rufina/Desktop/dishs/205_geraldine_posta-magazine.jpg",
                            9:"/Users/rufina/Desktop/dishs/305794452_b.jpg",
                            10:"/Users/rufina/Desktop/dishs/205_geraldine_posta-magazine.jpg",
                            11:"/Users/rufina/Desktop/dishs/caption (2).jpg",
                            12:"/Users/rufina/Desktop/dishs/orig (1).jpeg",
                            13:"/Users/rufina/Desktop/dishs/salat1.jpg",
                            14:"/Users/rufina/Desktop/dishs/orig.jpeg"}


    const list_input_fotos = await page.$$('input[type="file"]'); //список всех оокн для загрузки  фоток
    await list_input_fotos[0].uploadFile(file_dicitionary[randomIntFromInterval(0,14)]);//загружает фото '/Users/rufina/Desktop/dishs/salute.jpg'
    await page.waitFor(2000);

    await page.type('input[formcontrolname="name"]', "название акции");//заоплняем поле
    await page.waitFor(1000);//

    await page.type('div[data-placeholder="Текст акции..."]', "описание акции апвап вап ва п вап ывп ывп ыв пыв п ывп ");//заоплняем поле
    await page.waitFor(1000);//

    await page.$eval('input[formcontrolname="from"]', el => el.click());//Жмем на поле От(каледнарь)
    await page.waitFor(1000);//

    const  list_of_start_dates = await page.$$('td[class="mat-calendar-body-cell ng-star-inserted"]');//список дат начала
    await page.waitFor(1000);//
    list_of_start_dates[randomIntFromInterval(0, list_of_start_dates.length-1)].click();//кликаме арндомную дату начала


   await page.waitFor(1000);//
   await page.$eval('input[formcontrolname="to"]', el => el.click());//Жмем на поле До(каледнарь)
   await page.waitFor(1000);//

   const  list_of_end_dates = await page.$$('td[class="mat-calendar-body-cell ng-star-inserted"]');//список дат конца
   await page.waitFor(1000);//
   list_of_end_dates[randomIntFromInterval(0, list_of_end_dates.length-1)].click();//кликаме арндомную дату конца

   await page.waitFor(1000);//

   await page.$eval('span[class="button-text ng-star-inserted"]', el => el.click()); //жме мкнпоку Добавить

   await page.waitFor(1000);//
   await page.$eval('.fullWidth', el => el.click()); //жме мкнпоку Добавить в попапе


   await page.waitFor(9000);//чбы сращу браузер не закрылся
   return browser.close();//await browser.close();
}


const logErrorAndExit = err => {
  console.log(err);
  //console.log("result: " + value);
  process.exit();
};



run().catch(logErrorAndExit);//вызываем функцию run() котраяв ыше
