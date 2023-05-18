import fs from 'fs-extra';
import path from 'path';
import puppeteer, { HTTPRequest } from 'puppeteer';

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
  const save = async (url: string, interceptedRequest: HTTPRequest, filepath: string,) => {
    // @ts-ignore
    const response = await fetch(url, {
      method: interceptedRequest.method(),
      headers: interceptedRequest.headers(),
      body: interceptedRequest.postData(),
    });
    if (response.status !== 200) return console.warn(`Failed to fetch ${url} with status ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
  }
  page.on('request', async interceptedRequest => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    const url = interceptedRequest.url();
    if (url.startsWith('data:')) return interceptedRequest.continue();
    const urlNoHttp = url.replace(/https?:\/\//, '')
    const urlStripped = shouldStripQuery ? stripQuery(urlNoHttp) : urlNoHttp;
    const filepath = path.join(__dirname, 'files', urlStripped.endsWith('/') ? `${urlStripped}/index.html` : urlStripped);
    fs.ensureFileSync(filepath);
    interceptedRequest.continue()
    // make the request ourselves
    await save(url, interceptedRequest, filepath);
    if (url.endsWith('woff2')) {
      // try {
      //   await save(url.replace(/\.woff2/, '.woff'), interceptedRequest, filepath.replace(/\.woff2/, '.woff'))
      // } catch (error) { }
      try {
        await save(url.replace(/\.woff2/, '.ttf'), interceptedRequest, filepath.replace(/\.woff2/, '.ttf'))
      } catch (error) { }
    }
  });
  for (const url of urls) {
    await page.goto(url);
    await page.waitForNetworkIdle();
  }
  await browser.close();
})();