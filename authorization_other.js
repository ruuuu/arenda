const puppeteer = require('puppeteer');


let authorization = async (page) => {//метод авторзации
  await page.waitFor(1000);//ждем 1000милисек
  page.waitFor('input[formcontrolname=login]');//ждем пока на странцие page не загрузится поле input[formcontrolname=login]


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

  //или можно так:
  //await page.click('.fullWidth');  // вытасвиквае элемент по классу mat-button mat-primary fullWidth mat-flat-button^ fullWidth входит в это название класса

  //или можно так:
  //await page.keyboard.press('Enter');//жмем Ентер с  клавиатуры, РАБОТАЕТ
}


function randomIntFromInterval(min,max) // для генерации челого числа в прмоежутуке от мин до макс
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


function generatePhone(withPlus = 'off' || 'on' || 'any') {
   if (withPlus === 'any') {
     withPlus = Math.random() >= 0.5 ? 'off' : 'on';
   }

   let min, max;
   let plus = '';
   switch (withPlus) {
     case 'off':
       min = 80000000000;
       max = 89999999999;
       break;

     case 'on':
       min = 70000000000;
       max = 79999999999;
       plus = '+';
       break;
   }
   const phone = Math.floor(min + Math.random() * (max + 1 - min));
   return plus + phone;
 }

 function generateEmail() {
     const charactersForBody = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890_____-----.......';
     const charactersForEnd = 'abcdefghijklmnopqrstuvwxyz';

     function rand(min, max, characters = charactersForEnd) {
       let str = '';
       const len = Math.floor(min + Math.random() * (max + 1 - min));
       for (var i = 0; i < len; i++) {
         str += characters[Math.floor(1 + Math.random() * (characters.length)) - 1];
       }

       switch (str[0]) {
         case '.':
         case '_':
         case '-':
           str[0] = 'a'
       }

       switch (str[str.length - 1]) {
         case '.':
         case '_':
         case '-':
           str[str.length - 1] = 'z'
       }

       return str;
     }

     return rand(3, 8, charactersForBody) + '@' + rand(4, 7) + '.' + rand(2, 3);
   }

   function generateString(countWord = 1, countString = [1, 10], language = 'en' || 'ru' || 'all', register = 'down' || 'up' || 'all', withNumbers = false) /* по умолчанию без цифр,  если true то будут цифры */ {
       let result = '';
       let characters = '';
       if (language === 'en') {
         switch (register) {
           case 'down':
             characters += 'abcdefghijklmnopqrstuvwxyz';
             break;
           case 'up':
             characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
             break;
           case 'all':
             characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
             break;
         }
       }
       if (language === 'ru') {
         switch (register) {
           case 'down':
             characters += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
             break;
           case 'up':
             characters += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
             break;
           case 'all':
             characters += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
             break;
         }
       }
       if (language === 'all') {
         switch (register) {
           case 'down':
             characters += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz';
             break;
           case 'up':
             characters += 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ';
             break;
           case 'all':
             characters += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
             break;
         }
       }

       if (withNumbers) {
         characters += '12345678901234567890'
       }

       for (let w = 0; w < countWord; w++) {
         const countStr = Math.floor(countString[0] + Math.random() * (countString[1] + 1 - countString[0]));
         for (let i = 0; i < countStr; i++) {
           result += characters.charAt(Math.floor(Math.random() * characters.length));
         }

         if (w < countWord - 1) {
           result += ' ';
         }
       }

       return result;
     }



let run = async () => { //метод main
  // можно начать с этого (async () => или async function run()
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://admin.preorder.technaxis.com/external/login');//ждем пока станица не загрузится
    await page.setViewport({width: 1500, height: 1800});//устанавливаем размер окна област просомтра, не вьюпорта

    await page.waitFor(1000);
    await  authorization(page);// выызваем функцию  authorization автризации котрая  выше
    await page.waitFor(4000);// ждем пок азагрузится страница


    // кнпока Добавить заведение
    await page.$eval('button[class="header-action-button mat-flat-button mat-primary ng-star-inserted"]', el => el.click());




    await page.waitFor(4000);
    await page.$eval('mat-select[formcontrolname="cityId"]', el => el.click());//жмет на Выбор города
    await page.waitFor(1000);//



    const list_cities = await page.$$('mat-option[class="mat-option ng-star-inserted"]');//список городов
    await page.waitFor(1000);//
    list_cities[randomIntFromInterval(0, list_cities.length-1)].click();//кликаме рандомный город


    await page.waitFor(1000);//
    //
    await page.type('input[formcontrolname="managerFullName"]', generateString(3, [4,6], "all", "all" ));    //фио менеджера
    await page.waitFor(1000);//

    //либо можно записать  в поле так
    //const name_of_manager = 'Иванов Иван Иванович';
    //const filed_for_name_of_manager = await page.$('input[formcontrolname="managerFullName"]');//находим текствопе поле по селектору
    //await filed_for_name_of_manager.type(name_of_manager); //записываем в это поле name_of_manager
    await page.waitFor(2000);//

    await page.type('input[formcontrolname="shopId"]', "45279fdf-eed9-4c4d-89d2-b46a40f18496"); //вводим shopId
    await page.waitFor(1000);//

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

    try{
        const list_input_fotos = await page.$$('input[type="file"]'); //список всех оокн для загрузки  фоток
        await list_input_fotos[0].uploadFile(file_dicitionary[randomIntFromInterval(0,14)]);//загружает фото '/Users/rufina/Desktop/dishs/salute.jpg'

        await page.type('input[formcontrolname="companyName"]', "Амальфия"); //вводим "companyName"
        await page.waitFor(1000);//

        await page.type('input[placeholder="ФИО представителя заведения"]', "Иванов Иван Иванович");//вводим предаставителя
        await page.waitFor(1000);//

        await page.type('input[formcontrolname="phone"]', generatePhone("on"));//номер теелфона
        await page.waitFor(1000);//

        await page.type('input[formcontrolname="administratorPhone"]', "89367543326");//номер теелфона ""
        await page.waitFor(1000);//

        await page.waitFor(2000);//
        const email_filed = await page.$('input[placeholder="Email / логин"]');//

        await page.evaluate(() => {
            document.querySelector('input[placeholder="Email / логин"]').scrollIntoView();//скролллит к элементу с указанным селектором
        });
        await page.waitFor(2000);//

        email_filed.type(generateEmail());//заполняем поле email_filed
        await page.waitFor(1000);//



        await page.type('input[placeholder="Пароль"]', "password");
        await page.waitFor(1000);//

        await page.type('input[formcontrolname="dPassword"]', "password");
        await page.waitFor(1000);//

        await page.type('input[placeholder="Адрес"]', "проспект Ямашева, 51А, Казань, Республика Татарстан, Россия");
        await page.keyboard.press('Enter');//жмем Ентер

      }
      catch(err){
        console.log("не может заполнить поле" + err.message + "\n" + err.name);
      }


    await page.waitFor(2000);//



    const list_checkboks = await page.$$('div[class="mat-checkbox-frame"]');//для массива используем page.$$('selector'), list_checkboks это cпсиок чекбоксов



    console.log("list_checkboks" + " "+ list_checkboks);

    let rand_index = 1; //randomIntFromInterval(0,1);//генерим инекс для выбора Формата Пар /Базинеч Ланч
    console.log("rand_index equal" + " "+ rand_index);
    await page.waitFor(2000);

    list_checkboks[rand_index].click();//кликаем на БизнесЛанч
    await page.waitFor(2000);


    const list_radiobuttons = await page.$$('div[class="mat-ripple-element mat-radio-persistent-ripple"]'); //список всех радиобаттонов

       //Выбор меню (Кбмобокс, Аля крат Наборное):
    if (rand_index == 1){//если выбрали Бизнес-Ланч
         list_radiobuttons[randomIntFromInterval(0, 2)].click();//выбор Меню Обычное Наборное Комбо
         await page.waitFor(2000);
         list_radiobuttons[randomIntFromInterval(3, 4)].click();//выбираем Pro/Standart

    }
    else{
       list_checkboks[rand_index].click(); //если выбрали Пар
       await page.waitFor(2000);
       list_radiobuttons[randomIntFromInterval(0, 1)].click();//выбираем Pro/Standart

    }

    await page.waitFor(2000);



    await page.waitFor(1000);
    for (let i = 0; i < 5; i++){ //выбираем тип кухни
      list_checkboks[randomIntFromInterval(2,9)].click(); //Тип кухни  кликает   чекбокс c индексом от 0 до 8 включительно
      await page.waitFor(1000);
    }

   await page.waitFor(1000);
   for (let i = 0; i < 3; i++){ //выбираем Дополнительно
     list_checkboks[randomIntFromInterval(10,11)].click(); //Тип кухни  кликает   чекбокс c индексом от 10 до 11 включительно
     await page.waitFor(1000);
   }



   await page.waitFor(1000);
   for (let i = 0; i < 3; i++){ //выбираем Дополнительно
     list_checkboks[randomIntFromInterval(10,11)].click(); //Тип кухни  кликает   чекбокс c индексом от 10 до 11 включительно
     await page.waitFor(1000);
   }

   for (let i = 0; i < 3; i++){ //выбираем Способы оплаты
     list_checkboks[randomIntFromInterval(12,15)].click(); //
     await page.waitFor(1000);
   }

    await page.waitFor(2000);//



   //пока чон е хочет скроллить
   //await page.evaluate(() => {
       //document.querySelector('#mat-slide-toggle-17 > label > div > div > div.mat-slide-toggle-thumb').scrollIntoView();//скролллит к элементу с указанным селектором
   //});



   await page.type('input[placeholder="Процент сервису (%)"]', randomIntFromInterval(1,50).toString());//  число приводим к строковому типу
   await page.waitFor(1000);//
   await page.type('input[placeholder="Процент банку (%)"]', randomIntFromInterval(1,30).toString());

   await page.waitFor(1000);//
   await page.type('input[placeholder="Процент пользователю на бонусы (%)"]', randomIntFromInterval(1,20).toString());




   const list_togglers = await page.$$('span[class="mat-slide-toggle-content"]');//список тогглеров
   await page.waitFor(2000);//

   //await page.waitForSelector('#mat-slide-toggle-17 > label > div > div > div.mat-slide-toggle-thumb');//ждетп ока не загрузится этот элемент


    await page.waitFor(2000);//
    console.log("первый тогглер:");
    //list_togglers[0].click();//
    //console.log("нажали первый тогглер:");
    //await page.waitFor(3000);//жмем i-ый тогглер


    //await page.$('mat-select[formcontrolname="startTime"]').click();//нажимаем на маленький трегуольниек Открывается
    //await page.waitFor(3000);




   //  if (rand_index == 1){//если выбрали бизнес-ланч
   //   for (let i = 0; i < 4; i++){
   //     console.log("первый тогглер:");
   //     list_togglers[i].click();//
   //     console.log("нажали первый тогглер:");
   //     await page.waitFor(3000);//жмем i-ый тогглер
   //
   //     await page.$$('div[class="mat-select-arrow"]')[4*i+1].click();//нажимаем на маленький трегуольниек Открывается
   //     await page.waitFor(3000);
   //
   //     list_timings_open =  page.$$('mat-option[class="mat-option ng-star-inserted"]'); //список таймингов Открытия
   //     list_timings_open[randomIntFromInterval(0, list_timings_open.length-1)].click(); //выбираем рандомный тайминг из спика
   //     await page.waitFor(3000);
   //
   //     await page.$$('div[class="mat-select-arrow"]')[4*i+2].click();//нажимаем на маленький трегуольниек Закрытвается
   //     await page.waitFor(3000);
   //
   //     list_timings_close =  page.$$('mat-option[class="mat-option ng-star-inserted"]'); //список таймингов Закрытия
   //
   //
   //   }
   // }
   // else{
   //   console.log("иначе");
   // }





  await page.waitFor(1000);//
  await page.type('div[data-placeholder="Краткое описание заведения..."]', "какой-то текст в текстарии");//вводим тектс в тетсовую область
  await page.waitFor(2000);//

  await list_input_fotos[1].uploadFile(file_dicitionary[randomIntFromInterval(0,14)]);//загружает фото
  await page.waitFor(2000);//

  for (let i = 2; i < 10; i++){

      await list_input_fotos[2].uploadFile(file_dicitionary[randomIntFromInterval(0,14)]);//загружает  фото
      await page.waitFor(1000);//

  }




    await page.waitFor(4000);//чтобы сразу браузер не закрылся
    return browser.close();//await browser.close();
}


const logErrorAndExit = err => {
  console.log(err);
  //console.log("result: " + value);
  process.exit();
};



run().catch(logErrorAndExit);//вызываем функцию котраяв ыше
