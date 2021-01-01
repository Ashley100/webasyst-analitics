import puppeteer from 'puppeteer';
import libraries from './tools/libraries';

class Puppeteer {
    constructor(props) {

    }
    async start () {
        this.browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"]
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

export default Puppeteer;

// https://www.google.com/search?q=Рюкзаки, кошельки, сумки, аксессуары москва&as_qdr=all&tbas=0&start=100&sa=N
