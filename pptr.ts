import fs from 'fs-extra';
import path from 'path';
import puppeteer from 'puppeteer';

const stripQuery = (url: string) => url.replace(/\?.*$/, '');
const shouldStripQuery = true;

const urls = [
  'https://exponential-workload.github.io/fa-rehosted/load-fa-from-origin/'
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', async interceptedRequest => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    const url = interceptedRequest.url();
    const urlNoHttp = url.replace(/https?:\/\//, '')
    const urlStripped = shouldStripQuery ? stripQuery(urlNoHttp) : urlNoHttp;
    const filepath = path.join(__dirname, 'files', urlStripped.endsWith('/') ? `${urlStripped}/index.html` : urlStripped);
    fs.ensureFileSync(filepath);
    interceptedRequest.continue()
    // make the request ourselves
    // @ts-ignore
    const response = await fetch(url, {
      method: interceptedRequest.method(),
      headers: interceptedRequest.headers(),
      body: interceptedRequest.postData(),
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
  });
  for (const url of urls) {
    await page.goto(url);
    await page.waitForNetworkIdle();
  }
  await browser.close();
})();