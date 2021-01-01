import puppeteer from 'puppeteer';
import libraries from './tools/libraries';

class Puppeteer {
    constructor(props) {
        this.findSite = props.findSite;
        this.searchSystem = props.searchSystem;

        this.pagination = { total: 0, per: 0, prev: 0, current: 0, next: 0 }
    }

    async parse () {
        await this.start();
        await this.openPage();

        await this.gotoPage('https://www.google.com/search?q=Рюкзаки, кошельки, сумки, аксессуары москва&as_qdr=all&tbas=0&start=0&sa=N',{waitUntil: 'domcontentloaded', timeout: 5000})

        if (this.searchSystem === 'google') {
            return await this.findSiteInGoogle(this.findSite);
        }
        else if (false) {

        }
    };

    async start () {
        this.browser = await puppeteer.launch({ headless: true });
    };

    async openPage () {
        this.page = await this.browser.newPage();
    };

    async gotoPage (url, opt) {
        await this.page.goto(url, opt).then(res => {
            console.log("gotoPage -- ok");
        }).catch(err => {
            console.log('---- Страница не отвечает -----');
        });
    };

    async findSiteInGoogle (url) {
        const that = this;
        await this.page.addScriptTag({url: libraries.jquery});

        await this.page.mouse.wheel({ deltaY: 10000 });

        let dirtySites = await this.page.evaluate(body => {

            let links = [];

            $('.rc cite').each((i, el) => {
                let $clearedElement = $(el).find('span').remove();
                $clearedElement = $(el).text();
                links.push($clearedElement);
            });

            return links;
        });

        dirtySites = new Set(dirtySites);

        let cleanSites = Array.from(dirtySites).map( url => this.clearGoogleUrl(url));

        this.closeBrowser();

        return cleanSites;

    };

    clearGoogleUrl (url) {
        url = url.replace('www.', '');
        url = url.replace('http://', '');
        url = url.replace('https://', '');
        url = url.replace('/', '');
        return url;
    }

    async closeBrowser () {
        await this.browser.close();
    };
}


export default Puppeteer;

// https://www.google.com/search?q=Рюкзаки, кошельки, сумки, аксессуары москва&as_qdr=all&tbas=0&start=100&sa=N
