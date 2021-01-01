// import Google from '../../backend/parsers/google/google.js';

export default async (req, res) => {

  const { data } = req.body;

  // console.log(data.text);
  //
  // const parseGoogle = new Google ({
  //   findSite: data.text,
  //   utilsList: ['position', 'competitors', 'indexation'],
  // });
  //
  // let parse = await parseGoogle.parse();
  //
  // console.log("hello.js => ", parse);

  res.statusCode = 200;
  // res.json({ name: 'John Doe', parse: parse[1] })
  res.json({ name: 'John Doe' })
}
