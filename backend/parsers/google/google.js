import getPositionInfo from "./utils/position";

/**
 * Class takes <object> params: {
 *      findSite: 'string',
 *      keyWords: ['array of keywords'],
 *      region: 'string',
 *      utilsList: ['array of utils.'],
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
            findSite  : props.findSite,
            keyWords  : props.keyWords,
            region    : props.region,
            utilsList : props.utilsList,
        }
    }

    async parse () {
        let promises = [],
            options = { ...this.options };

        if(options.utilsList.includes('position')) {
            promises.push(await getPositionInfo({findSite: 'avito.ru'}));
        }
        if(options.utilsList.includes('competitors')) {
            promises.push(await getPositionInfo({findSite: 'svyaznoy.ru'}));
        }

        let data = Promise.all([
            ...promises
        ]).then(res => {
            return res;
        }).catch(err => {
            throw err;
        });


        return data;
    };
}


export default Google;