/**
 * 请确保安装了request和bluebird两个模块
 * 安装模块：打开NODEJS-->输入npm install request-->输入npm install bluebird
 **/

var axios = require('axios');

// 请填写无忧代理订单号
var order = '';
// 要测试的网址
var targetURL = 'http://ip.chinaz.com/getip.aspx';
// 请求超时时间
var timeout = 8000;
// 测试次数
var testTime = 5;
// 间隔多少毫秒调用一次接口
var sleepTime = 5000;

var apiURL = 'http://api.ip.data5u.com/dynamic/get.html?order=' + order + '&sep=3';

console.log('>>>> start test dynamic ip');

function getProxyList() {
    const options = {
        method: 'GET',
        url: apiURL,
        gzip: true,
        encoding: null,
        headers: {},
    };
    return axios(options)
        .then(response => {
            // console.log(response.data);
            return [response.data.trim()];
        })
        .catch(err => {
            console.error(err);
        });
}

function execute() {
    getProxyList().then(proxyList => {
        var targetOptions = {
            method: 'get',
            url: targetURL,
            timeout: timeout,
            encoding: null,
        };

        proxyList.forEach(proxyurl => {
            console.log(`* testing `);
            var startTimestamp = new Date().valueOf();
            targetOptions.proxy = 'http://' + proxyurl;
            axios(targetOptions)
                .then(response => {
                    const body = respons.body.toString();
                    const endTimestamp = new Date().valueOf();
                    console.log('  > time ' + (endTimestamp - startTimestamp) + 'ms ' + body);
                })
                .catch(e => {
                    console.error(e);
                });
        });
    });
}

// 定时执行
const interval = setInterval(function() {
    if (testTime > 0) {
        execute();
    } else {
        clearInterval(interval);
        console.log('<<<< end test dynamic ip');
    }
    testTime = testTime - 1;
}, sleepTime);
