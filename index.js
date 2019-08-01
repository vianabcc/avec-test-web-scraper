const puppeteer = require('puppeteer');
const fs = require("fs");
const INFO = require('./info-search');

const ESTABLISHMENT_SELECTOR = '#stablishmentType';
const LOCATION_SELECTOR = '#location';
const BUTTON_SELECTOR = '#form__region > button';
const BEAUTY_SALON_SELECTOR = '#form__region > fieldset:nth-child(1) > ul > li:nth-child(2)';
const LIST_SALON_NAME_SELECTOR_CLASS = 'name';
const LIST_SOLON_LOGO_SELECTOR_CLASS = 'box-image';

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  
  await page.goto('https://avec.app', { timeout:0 });

  setTimeout(async () => {
    await page.click(ESTABLISHMENT_SELECTOR);

    if(INFO.establishment === 'SALAO_DE_BELEZA'){
      await page.click(BEAUTY_SALON_SELECTOR);
    } 
  }, 500)

  setTimeout(async () => {
    await page.click(LOCATION_SELECTOR);
    await page.keyboard.type(INFO.location);
  }, 1000);

  setTimeout(async () => {
    await page.click(BUTTON_SELECTOR);
  }, 2000);

  await page.waitForNavigation({timeout:0});
  await page.waitFor(5000);

  const list_data = []

  for(let i = 0; i < 10; i++){
    let salonName = await page.evaluate((sel, i) => {
      
      return document.getElementsByClassName(sel)[i].innerHTML;
    }, LIST_SALON_NAME_SELECTOR_CLASS, i);

    let salonLogo = await page.evaluate((sel, i) => {
      
      return document.getElementsByClassName(sel)[i].getAttribute('style');
    }, LIST_SOLON_LOGO_SELECTOR_CLASS, i);

    salonLogo = salonLogo.replace('background-image: url("', '')
    salonLogo = salonLogo.replace('");', '')

    data = {
      'salao': salonName,
      'logo': salonLogo
    }

    list_data.push(data)
 }

 const filePath = './response/data.json';

 var writeContent = await JSON.stringify(list_data)

 await fs.writeFile(filePath, writeContent, function (err) {
  if (err) throw err;
  console.log("\n\nDone! File saved in the directory /response/data.json")
});

await page.waitFor(3000);

var readContent = require(filePath);
console.log("File output:\n\n", readContent)

await browser.close();
  
})();