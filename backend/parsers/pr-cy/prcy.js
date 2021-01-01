import puppeteer from 'puppeteer';
import libraries from '../../tools/libraries';
import Puppeteer from "../../puppeteer";

class Prcy extends Puppeteer{
    constructor(props) {
        super ();

        this.findSite = props.findSite;
        this.searchSystem = props.searchSystem;

        this.pagination = { total: 0, per: 0, prev: 0, current: 0, next: 0 }
    }

    async parse () {
        await this.start();
        await this.openPage();
        await this.gotoPage('https://pr-cy.ru/site-statistics/?domain=bagyou.ru',{waitUntil: 'domcontentloaded', timeout: 5000});

        return await this.CombineData();
    };

    async CombineData () {

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
}


export default Prcy;