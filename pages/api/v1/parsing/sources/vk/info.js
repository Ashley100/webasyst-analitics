import Vk from "../../../../../../backend/parsers/vk/vk";

/**
 *  Entry data structure in req.body
 *  {
 *       searchSite: <string>     | "ip.ru"
 *  }
 */

export default async (req, res) => {

    const { data } = req.body;

    console.log("vk.js >> ", data);

    const parseVk = new Vk ({
        dataToParse: data
    });

    const parsedVkData = await parseVk.parse();

    res.statusCode = 200;
    res.json({ parsedVk: parsedVkData });
}