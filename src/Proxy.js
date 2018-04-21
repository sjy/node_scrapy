const axios = require('axios');

// 请填写无忧代理订单号
const DefaultOrder = 'xxx';

function getProxy(order = DefaultOrder) {
    const options = {
        gzip: true,
        encoding: null,
        headers: {},
    };

    return axios
        .get('http://api.ip.data5u.com/dynamic/get.html?order=' + order + '&sep=3', options)
        .then(response => {
            // console.log(response.data);
            return response.data.trim();
        })
        .catch(err => {
            console.error('Get Proxy Failed', err);
        });
}

module.exports = exports = {
    getProxy,
};
