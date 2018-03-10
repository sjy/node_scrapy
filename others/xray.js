const fs = require('fs');
const parse = require('csv-parse');
const x = require('x-ray');

const fileData = fs.readFileSync('./scrapy_1.csv');
const parseOption = {
    columns: ['url'],
    trim: true,
    skip_empty_lines: true,
    delimiter: '\t',
};

const process = (err, rows) => {
    return rows.map(url =>
        x(url, { title: ['title'] })((err, obj) => {
            console.log({ obj });
        })
    );
};

parse(fileData, parseOption, process);
