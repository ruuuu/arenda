const puppeteer = require('/Users/rufina/node_modules/puppeteer'); //подключаем библиотеку
const url='http://react-redux.realworld.io/#/login?_k=hl2day';

async function getPic() { //функция getPic() функция асинхронная, она, при вызове, возвращает объект Promise Когда функция, определённая с ключевым словом async, завершает работу и возвращает некое значение, промис либо будет разрешён
  const browser = await puppeteer.launch({headless: false}); //запускаем puppeteer,ожидание либо успешного запуска        экземпляра Chrome, либо возникновения ошибки.  по умолчанию все чтопроисходит враузере мы не видим, но если надо вклчить то добвялем параметр {headless: false}
  const page = await browser.newPage(); // открваем вкладку браузера
  await page.goto(url); //переходми на этот url
  await page.setViewport({width: 1440, height: 900});//устанавливаем размер окна браузера

  //await page.screenshot({path: 'google.png'}); // метод screenshot({path: 'google.png'}) делает скрин текущей страницы, передаем объект
  const result = await page.evaluate(() => {
    let emilField = document.querySelector('.email-field');
    let passwordField = document.querySelector('.password-field');
    let submitButton = document.querySelector('.btn');
    emilField.type('rufinka_91@mail.ru');
    passwordField.type('password');
    submitButton.click();
  });


 //const emilField = page.querySelector('.email-field');
 //const passwordField = page.querySelector('.password-field');
 //const submitButton = rootNode.querySelector('.btn');






  await browser.close();//закрываем браузер
}

getPic(); // вызываем функцию

//await page.waitForSelector(selector); //ждет пока элемент с тким селектором подгрузится

//----------------------------------------------
//const puppeteer = require('puppeteer');

//(async () => {
//   const browser =  await puppeteer.launch({headless: false}); //передаем объект{headless: false}, будем видеть кк браузер откыается
//   const page = await browser.newPage();
//   await page.goto('https://joel.tools/merch');
//
//
//   const price = await page.$eval('.price', div => div.textContent); //из элемента <div class="price">$50</div> забиарем значение цены с помощью свойства textContent и запсиываем эт значение в переменную price
//   //
//   console.log(price);
//   await browser.close();
//
// })();
// //-----------------------------------------------

//--------------------------------------------------------
// const els = await page.$$('div.parent'); //список элементов с селектором div.parent, ув этом элеенте есть тег img  и a
//
//
// for (let i = 0; i < els.length; i++) {
//
//     const img = await els[i].$eval('img', i => i.getAttribute('src'));
//     console.log(img);
//
//     const link = await els[i].$eval('a', a => a.getAttribute('href'));
//     console.log(link);
// }

//------------------------------------------

// const nodeChildren = await page.$eval(cssSelector, (uiElement) => {
//   return uiElement.children;
// });
// console.log(nodeChildren); // Outputs the array of the nodes children

//-------------------------------------------------------


//----------------------------------------------
// <div class ="container" id= "12">
//     <div class="details" desc-type= "multiline">
//         <a href="#">
//             <div class="description"> Some Description </div>
//         </a>
//     </div>
// </div>
//
//
// const movies = await page.$$eval(
//     "div.container",
//       nodes =>
//         nodes.map(element => {
//           return {
//             movieID: element.getAttribute("id"),
//             descType: element.querySelector('[desc-type]').getAttribute('desc-type'),
//             description: element.querySelector(".description").innerText
//           };
//         } )
//     );
//
//
//
// //--------------------------------------
// let children = element.childNodes;
//
// for(child in children){
//     console.log(children[child]);
// }


//-------------------------------------


// const puppeteer = require('puppeteer');
// (async () => {
//   const browser =  await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//
//
//   page.pdf({path: 'hn.pdf', format: 'A4'});
//
//
//  })();


//---------------------------------------------
 //const puppeteer = require('puppeteer');

 // (async () => {
 //    const browser =  await puppeteer.launch();
 //    const page = await browser.newPage();
 //    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
 //
 //
 //
 //
 //
 //  });


  //})();


  //await page.waitForSelector('input[type="file"]') //ждет когда элемент с этим селектором загрузится  на станицу
  //await page.click('.file-dialog-trigger')


  //await page.evaluate(() => {
      //document.querySelector('input[placeholder="Email / логин"]').scrollIntoView();//скролллит к элементу с указанным селектором
  //});

  //const checkboxs =  await page.$('input[type="checkbox"]');// чекбокс




  //await page.waitFor(2000);//
  //await page.$eval('input[type="checkbox"]', el => el.click());




  // for (let i = 0; i < 2; i++){
  //   //selector_child = 'input[type="checkbox"]';
  //   await page.waitFor(2000);//
  //   console.log("Clicking checkbox");
  //
  //   const checkbox = await page.$('div[class="mat-checkbox-frame"]');//находит чекбокс
  //   await checkbox.click();//кликает по нему
  // }



 //найдет все чекбоксы по указанному селектору и чекнит их
  //const grupos = await page.evaluate( () => Array.from( document.querySelectorAll('div[class="mat-checkbox-frame"]'), element => element.click()) );


  //const [button] = await page.$x("//span[contains(., 'Добавить заведение')]");  //ищет элемент (в даннос случае кнпоку) накотром есть надпись Добавить заведение
  //if (button) { //если кнпока существет то нажмет
     //await button.click();
   //}


   await page.type('input[formcontrolname="managerFullName"]', "Иванов Иван Иванович");    //фио менеджера
   await page.waitFor(1000);//

   //либо можно записать  в поле так
   //const name_of_manager = 'Иванов Иван Иванович';
   //const filed_for_name_of_manager = await page.$('input[formcontrolname="managerFullName"]');//находим текствопе поле по селектору
   //await filed_for_name_of_manager.type(name_of_manager); //записываем в это поле name_of_manager

   const name_of_manager = 'Иванов Иван Иванович';
   const filed_for_name_of_manager = await page.$('input[formcontrolname="managerFullName"]');//находим текствопе поле по селектору
   await filed_for_name_of_manager.type(name_of_manager); //записываем в это поле name_of_manager
