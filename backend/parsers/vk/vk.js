import Puppeteer from "../../puppeteer";

/**
 * Class takes <object> params: {
 *      @someParam: 'string',
 * }
 *
 * Usage:
 * const options = {
 *      someParam: 'vk.com',
 * }
 * const googleParse = new Google (options);
 */

class Vk extends Puppeteer {
    constructor(props) {
        super();

        this.someParam = props;
    }

    async parse () {

        await this.start();


        setTimeout(async ()=> {
            await this.closeBrowser()
        }, 3000);



        return {
            vkProfileUrl: "https://vk.com/wiwit",
            vkGroupUrl: "https://vk.com/youthfullness",
            vkGroupSubscribersCount: 4000,
        }
    }
}

export default Vk;