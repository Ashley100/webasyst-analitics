import cheerio from 'cheerio';
import tools from "../../../tools/tools";
import {toBase64} from "next/dist/next-server/lib/to-base-64";

class Position {
    constructor({puppeteer, page, options}) {
        this.page = page;
        this.puppeteer = puppeteer;

        this.findSite = options.findSite;
        this.search = {
            params: {
                searchUrl: 'https://www.google.com/search?q=',
                // searchKeywords: 'Рюкзаки, кошельки, сумки, аксессуары москва',
                searchKeywords: options.keyWords.join('') + " " + options.location.region,
                findSite: options.findSite,
                tbas: 0,
                start: 0
            },
            result: {
                searchSystem: 'Google',
                page: undefined,
                coincidences: [],
                position: 0,
                screenShot: ''
            }
        };

        this.pagination = { total: 0, per: 10, current: 0, page: 0 };

        this.selectors = {
            linksSelector: '.rc cite'
        };

    }

    async parse () {

        let data = await this.findSitePosition(this.findSite);

        console.log("data ", data);

        data.findSite = this.findSite;

        await this.page.close();

        return data;
    };

    async findSitePosition (url) {
        const that = this;
        const searchParams = { ...this.search.params };
        let result = {};

        // await this.gotoPage('https://www.google.com/search?q=Рюкзаки, кошельки, сумки, аксессуары москва&as_qdr=all&tbas=0&start=0&sa=N',{waitUntil: 'domcontentloaded', timeout: 5000});

        async function find () {
            if (!result.isFound && that.pagination.current <= 100) {

                const searchUrl = `${searchParams.searchUrl}${searchParams.searchKeywords}&start=${that.pagination.current}`;

                await that.puppeteer.gotoPage(that.page, searchUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });

                result = await that.findLinkOnPage();

                that.search.result.coincidences.push(...result.links);

                that.pagination.current = that.pagination.current + that.pagination.per;

                that.pagination.page++;

                await find();

            } else {
                await that.page.screenshot({
                    // path: 'screenshot.png'
                    type: 'jpeg',
                    fullPage: true,
                }).then(res => {
                    // that.search.result.screenShot = toBase64(res);
                    // console.log(res);
                });

                that.search.result.coincidences.push(...result.links);

                that.search.result.page = that.pagination.page;

            }
        }
        await find();

        return { ...that.search };

    };

    async findLinkOnPage () {
        // await this.page.addScriptTag(tools.libraries.jquery);

        const that = this;

        await this.page.mouse.wheel({ deltaY: 10000 });

        let waiting = await this.puppeteer.waitSelector(this.selectors.linksSelector, { timeout: 4000 });

        const content = await this.page.content();

        let $ = cheerio.load(content);

        let links = [];

        $(that.selectors.linksSelector).each((i, el) => {
            let $currentLink = $(el);
            $currentLink.find('span').remove();
            links.push($currentLink.text());

            // if (tools.url.clearUrl($currentLink.text()) === that.search.params.findSite) {
            //     $currentLink.css('background', '#eee');
            // }
        });

        links = new Set(links);

        let cleanLinks = Array.from(links).map( url => {
            that.search.result.position++;
            return tools.url.clearUrl(url);
        });
        let cleanFindSite = tools.url.clearUrl(this.findSite);

        console.log("util:position > isFound", cleanLinks.includes(this.findSite), cleanFindSite);

        return {
            links: cleanLinks,
            isFound: cleanLinks.includes(cleanFindSite),
        };
    };
}


const getPositionInfo = (options) => {
    // const positionInfo = new Position(options);
    return new Position(options);
};

export default getPositionInfo;