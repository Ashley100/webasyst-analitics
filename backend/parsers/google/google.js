import Puppeteer from "../../puppeteer";
import getPositionInfo from "./utils/position";

/**
 * Class takes <object> params: {
 *      @searchSite: 'string',
 *      @searchSystem: 'string',
 *      @searchKeywords: ['array of keywords'],
 *      @searchLocation: <object>,
 *      @utilsList: ['array of utils.'],
 * }
 * @returns { object }
 *
 * Usage:
 * const options = {
 *      findSite: 'ip.ru',
 *      keyWords: ['определение ip', 'как узнать ip'],
 *      region: 'москва',
 *      utilsList: ['position', 'competitors']
 * }
 * const googleParse = new Google (options);
 */
class Google extends Puppeteer {
    constructor(props) {
        super();

        this.options = {
            findSite    : props.searchSite,
            system      : props.searchSystem,
            keyWords    : props.searchKeywords,
            location    : {
                country : {},
                region  : props.searchLocation.region.name + " " + props.searchLocation.region.type_short,
                city    : {}
            },
            utilsList   : props.utilsList,
        };
    }

    async parse () {

        await this.start();

        let promises = [],
            options = { ...this.options };

        if(options.utilsList.includes('position')) {
            console.log("if position");
            this.positionPage = await this.openPage();
            let positionPageInstance = getPositionInfo({puppeteer: this, page: this.positionPage, options});
            promises.push(positionPageInstance.parse());
        }
        // if(options.utilsList.includes('competitors')) {
        //     console.log("if competitors");
        //     this.competitorsPage = await this.openPage();
        //     let competitorsPageInstance = getPositionInfo({puppeteer: this, page: this.competitorsPage, options: { ...options, keyWords: ['Купить рюкзак'], findSite: 'https://avito.ru/' }});
        //     promises.push(competitorsPageInstance.parse());
        // }

        return Promise.all([
            ...promises
        ])
        .then(async res =>  res)
        .catch(async err => {throw err})
        .finally(async res => {
            await this.closeBrowser();
        });

    };
}

export default Google;