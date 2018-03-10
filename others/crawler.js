const fs = require('fs');
const parse = require('csv-parse');
const Crawler = require('crawler');

const fileData = fs.readFileSync('./scrapy_1.csv');

const parseOption = {
    columns: ['url'],
    trim: true,
    skip_empty_lines: true,
    delimiter: '\t',
};

const crawler = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($('title').text());
        }
        done();
    },
});

crawler.on('schedule', function(options) {
    // console.warn('schecduled', options);
});

crawler.on('drain', function() {
    // For example, release a connection to database.
});

parse(fileData, parseOption, process);

function process(err, rows) {
    crawler.queue(rows.map(r => r.url));
    // Queue just one URL, with default callback
}
