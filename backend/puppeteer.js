import puppeteer from 'puppeteer';

class Puppeteer {
    constructor(props) {}

    async start () {
        this.browser = await puppeteer.launch({
            headless: true,
            slowMo: 100,
            args: [
                '--no-sandbox',
                // '--proxy-server=185.34.22.225:37879'
            ],
        });
    };

    async openPage () {
        this.page = await this.browser.newPage();
    };

    async gotoPage (url, opt) {
        await this.page.goto(url, opt).then(res => {
            return { status: 'ok', res: {...res} };
        }).catch(err => {
            throw { status: 'error', err: {...err} };
        });
    };

    async waitSelector (selector, options) {
        try {
            return await this.page.waitForSelector(selector, options);
        } catch (e) {
            return e;
        }
    }

    async closeBrowser () {
        await this.browser.close();
    };
}

export default Puppeteer