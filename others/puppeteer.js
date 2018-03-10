const fs = require('fs');
const parse = require('csv-parse');
const puppeteer = require('puppeteer');

async function run(browser, url) {
    const page = await browser.newPage();
    await page.goto(url, {
        timeout: 15000,
    });
    // console.log(url);
    // Wait for the results to show up
    await page.waitForSelector('title');
    // Extract the results from the page
    const titles = await page.evaluate(() => {
        const titles = Array.from(document.querySelectorAll('title'));
        return titles.map(t => t.textContent);
    });

    await page.close();
    return titles[0];
}

const fileData = fs.readFileSync('./scrapy_1.csv');
parse(
    fileData,
    {
        columns: ['url'],
        trim: true,
        skip_empty_lines: true,
        delimiter: '\t',
    },
    async function(err, rows) {
        if (err) console.error(err);
        const browser = await puppeteer.launch({
            headless: true,
            // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        });
        for ({ url } of rows) {
            await run(browser, url)
                .catch(e => console.error('cuowu'))
                .then(title => {
                    console.log({ url, title });
                });
        }
        await browser.close();
    }
);
