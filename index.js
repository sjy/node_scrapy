const fs = require('fs');
const csvWriter = require('csv-write-stream');
const puppeteer = require('puppeteer');
const selectMovie = require('./src/selectMovie');
const writer = csvWriter({
    headers: ['uid', 'title', 'directBy', 'initialReleaseDate', 'rate', 'votes', 'related'],
});

writer.pipe(fs.createWriteStream('./dist/movies.csv', { flags: 'a' }));

const map = new Set();
const queue = [];

async function fetchMovie(browser, uid) {
    const page = await browser.newPage();
    let row = {};
    try {
        await page.goto('https://movie.douban.com/subject/' + uid + '/', {
            timeout: 15000,
            waitUntil: 'networkidle2',
        });

        // Wait for the results to show up
        await page.waitForSelector('span[property$=itemreviewed]');

        row = await page.evaluate(selectMovie);
        await page.close();
    } catch (e) {
        console.log({ seed: uid, error: e });
        return row;
    }

    return row;
}

async function run() {
    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({ headless: false });
    // start from 黑豹
    queue.push(6390825);
    while (map.size < 100000 && queue.length > 0) {
        let seed = queue.shift();
        const { data = [], recommendations = [] } = await fetchMovie(browser, seed);
        if (data && data.length > 0) {
            // store data
            map.add(seed);
            console.log(seed);
            await writer.write([seed, ...data]);
        }
        if (recommendations && recommendations.length > 0) {
            // 把没有抓取过的uid放到队列里面
            recommendations.filter(sd => !map.has(sd)).forEach(sd => queue.push(sd));
        }
    }

    writer.end();
    await browser.close();
}

run();
