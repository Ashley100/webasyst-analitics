import Google from '../../backend/parsers/google/google.js';
import Vk from '../../backend/parsers/vk/vk';

/**
 *  Entry data structure in req.body
 *  {
 *       searchSite: <string>     | "ip.ru"
 *       searchSystem: <object>   | { google: <boolean>, yandex: <boolean> }
 *       searchLocation: <object> | { country: <object>, region: <object>, city: <object> }
 *       searchKeywords: <array>  | ['определить ip', 'какой у меня ip', 'как узнать мой ip адрес']
 *  }
 */

export default async (req, res) => {

  const { data } = req.body;

  console.log("hello.js >> ", data);

  const parseGoogle = new Google ({
      searchSite: data.searchSite,
      searchSystem: data.searchSystem,
      searchLocation: data.searchLocation,
      searchKeywords: data.searchKeywords,
      utilsList: ['position', 'competitors', 'indexation'],
  });

  const parseVk = new Vk ({
      dataToParse: "Some data to parsing. Like site url, name, keywords, etc."
  });

  let parse = {
      google: {...await parseGoogle.parse()},
      vk: {...await parseVk.parse()}
  };

  console.log("hello.js => parseGoogle.parse() => ", parse);

  res.statusCode = 200;
  res.json({ name: 'John Doe', parse: parse });
  // res.json({ name: 'John Doe' })
}
