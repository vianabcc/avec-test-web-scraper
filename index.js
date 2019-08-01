// Importing libraries and information required
const puppeteer = require('puppeteer');
const fs = require("fs");
const INFO = require('./info-search');

// Defining constants for selectors
const ESTABLISHMENT_SELECTOR = '#stablishmentType';
const LOCATION_SELECTOR = '#location';
const BUTTON_SELECTOR = '#form__region > button';
const BEAUTY_SALON_SELECTOR = '#form__region > fieldset:nth-child(1) > ul > li:nth-child(2)';
const LIST_SALON_NAME_SELECTOR_CLASS = 'name';
const LIST_SOLON_LOGO_SELECTOR_CLASS = 'box-image';

(async () => {
  console.log("Searching data...\n")
  const browser = await puppeteer.launch({ headless: false}); // To view the action runnig, set to false
  const page = await browser.newPage();

  await page.goto('https://avec.app', { timeout:0 }); // BaseURI

  // Setting info to search the required data
  setTimeout(async () => {
    await page.click(ESTABLISHMENT_SELECTOR);

    if(INFO.establishment === 'SALAO_DE_BELEZA'){ // Set establishment type
      await page.click(BEAUTY_SALON_SELECTOR);
    }
  }, 500)

  setTimeout(async () => {
    await page.click(LOCATION_SELECTOR); // Set the location
    await page.keyboard.type(INFO.location);
  }, 1000);

  setTimeout(async () => {
    await page.click(BUTTON_SELECTOR); // Click to search
  }, 2000);

  await page.waitForNavigation({timeout:0});
  await page.waitFor(2000)

  const list_data = []

  console.log("\nGetting data...\n")
  for(let i = 0; i < INFO.quantity; i++){ // Iterate over the list of information

    let salonName = await page.evaluate((sel, i) => {
      return document.getElementsByClassName(sel)[i].innerHTML;
    }, LIST_SALON_NAME_SELECTOR_CLASS, i);

    let salonLogo = await page.evaluate((sel, i) => {
      return document.getElementsByClassName(sel)[i].getAttribute('style');
    }, LIST_SOLON_LOGO_SELECTOR_CLASS, i);

    salonLogo = salonLogo.replace('background-image: url("', '').replace('");', '')

    // Mounting the object
    data = {
      salao: salonName,
      logo: salonLogo
    }

    list_data.push(data)
    console.log(`${i+1} data obtained`)
  }
  console.log("\nSaving data...")
  // Write the data in a JSON file and show it in the console
  const filePath = './response/data.json';

  var writeContent = await JSON.stringify(list_data)

  await fs.writeFile(filePath, writeContent, function (err) {
    if (err) throw err;
    console.log("\nDone!\nFile saved in the directory /response/data.json")
  });

  await page.waitFor(3000);

  var readContent = require(filePath);
  console.log("File output:\n\n", readContent)

  await browser.close();
})();
