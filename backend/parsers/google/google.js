import getPositionInfo from "./utils/position";

/**
 * Class takes <object> params: {
 *      @findSite: 'string',
 *      @keyWords: ['array of keywords'],
 *      @region: 'string',
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
class Google {
    constructor(props) {
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
        }
    }

    async parse () {
        let promises = [],
            options = { ...this.options };

        if(options.utilsList.includes('position')) {
            promises.push(await getPositionInfo(options));
        }
        // if(options.utilsList.includes('competitors')) {
        //     promises.push(await getPositionInfo(options));
        // }

        return Promise.all([
            ...promises
        ]).then(res => {
            return res;
        }).catch(err => {
            throw err;
        });

    };
}

let d = {
    meta: {
        title: {
            name: 'Title',
            text: 'Рюкзаки и аксессуары в Казани',
            textLength: 29,
            icon: 'some-icon'
        },
        description: {
            name: 'Description',
            text: 'Интернет-магазин рюкзаков, сумок, кошельков и аксессуаров в Казани. Большой выбор оригинальных и качественных городских моделей.',
            textLength: 128,
            icon: 'some-icon'
        }
    }

}

export default Google;