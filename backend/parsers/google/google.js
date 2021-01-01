import getPositionInfo from "./utils/position";

class Google {
    constructor(props) {
        this.findSite = props.findSite;
        this.utilsList = props.utilsList;
    }

    async parse () {
        let promises = [];

        if(this.utilsList.includes('position')) {
            promises.push(await getPositionInfo({findSite: 'avito.ru'}));
        }
        if(this.utilsList.includes('competitors')) {
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