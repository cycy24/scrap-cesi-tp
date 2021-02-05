const puppeteer = require('puppeteer');
require('dotenv').config({path: __dirname + '/../.env'});

module.exports.scrap = async function scrap() {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: '/usr/bin/chromium-browser'});
    const page = await browser.newPage();

    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');

    await page.goto('https://ent.cesi.fr/');
    await page.type('input[id=login]', process.env.LOGIN)
    await page.click('a[id=submit]');
    await timeout(3000)
    await page.type('input[id=passwordInput]', process.env.PWD);
    await page.click('span[id=submitButton]');
    await timeout(5000)

    const result = await page.cookies();
    await page.close();
    await browser.close();

    return {
        JSESSIONID: result.find(x => x.name === "JSESSIONID").value,
        SERVERID: result.find(x => x.name === "SERVERID").value,
    };
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}