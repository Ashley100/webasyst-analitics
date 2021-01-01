import Puppeteer from "../../../puppeteer";
import cheerio from 'cheerio';
import tools from "../../../tools/tools";
import {toBase64} from "next/dist/next-server/lib/to-base-64";

class Position extends Puppeteer {
    constructor(props) {
        super ();

        this.findSite = props.findSite;
        this.search = {
            params: {
                searchUrl: 'https://www.google.com/search?q=',
                // searchKeys: 'Рюкзаки, кошельки, сумки, аксессуары москва',
                searchKeys: 'купить iphone москва',
                findSite: props.findSite,
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
        await this.start();

        await this.openPage();

        let data = await this.findSitePosition(this.findSite);

        console.log("data ", data);

        await this.closeBrowser();

        data.findSite = this.findSite;

        return data;
    };

    async findSitePosition (url) {
        const that = this;
        const searchParams = { ...this.search.params };
        let result = {};

        // await this.gotoPage('https://www.google.com/search?q=Рюкзаки, кошельки, сумки, аксессуары москва&as_qdr=all&tbas=0&start=0&sa=N',{waitUntil: 'domcontentloaded', timeout: 5000});

        async function find () {
            if (!result.isFound && that.pagination.current <= 100) {

                const searchUrl = `${searchParams.searchUrl}${searchParams.searchKeys}&start=${that.pagination.current}`;

                await that.gotoPage(searchUrl,{waitUntil: 'domcontentloaded', timeout: 5000});

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
        this.page.addScriptTag(tools.libraries.jquery);

        const that = this;

        await this.page.mouse.wheel({ deltaY: 10000 });

        let waiting = await this.waitSelector(this.selectors.linksSelector, { timeout: 4000 });

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

        return {
            links: cleanLinks,
            isFound: cleanLinks.includes(this.findSite),
        };
    };
}


const getPositionInfo = async (props) => {
    const positionInfo = new Position(props);
    return await positionInfo.parse();
};

export default getPositionInfo;