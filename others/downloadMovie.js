const fs = require('fs');
const Crawler = require('crawler');
const WebTorrent = require('webtorrent');

const client = new WebTorrent();

const parseOption = {
    columns: ['url'],
    trim: true,
    skip_empty_lines: true,
    delimiter: '\t',
};

const crawler = new Crawler({
    maxConnections: 5,
    // This will be called for each crawled page
    callback: function(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log($('title').text());
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

crawler.queue([
    {
        uri: 'http://www.lbldy.com/television/77655.html',
        jQuery: true,
        // The global callback won't be called
        callback: function(error, res, done) {
            if (error) {
                console.error(error);
            } else {
                // [...[集数：url]]
                var $ = res.$;
                const allSimpleChineseDownloadLink = $('a[href^=ed2k]')
                    .filter((i, a) => a.attribs.href && a.attribs.href.includes(encodeURI('夸世代国语')))
                    .map((i, a) => a.attribs.href)
                    .toArray();
                console.log(allSimpleChineseDownloadLink.filter((link, i) => i > 23));
            }

            done();
        },
    },
]);

function parseEd2kToMagnet(link) {
    return;
}

function download(links) {
    console.log(links[0]);
    client.add(parseEd2kToMagnet, { path: '.' }, function(torrent) {
        torrent.on('done', function() {
            console.log('torrent download finished');
        });
    });
}
