'use strict'
const puppeteer = require('puppeteer');

module.exports = function (fastify, opts, next) {
  fastify.get('/example', function (request, reply) {
    reply.send(':this is an example111')
  })

  fastify.get('/createTaoPwdUrl',async function (request, reply) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let res = {'code':200,url:''};
    page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36")
    await page.goto(`https://uland.taobao.com/coupon/edetail?itemId=${request.query.numIid}`);
    let targetHref = await page.$eval('#mx_9 > .item-con > .item-info-con > a', ele => ele.href);
    res.url = targetHref;
    reply.send(res);
  })

  next()
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
