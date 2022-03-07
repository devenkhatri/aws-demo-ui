const { fetchRepositories, getURL } = require('./utils/fetchdata');
const { success, error } = require('./utils/response');

export default async function handler(req, res) {  
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const { language, since, spoken_language_code: spokenLanguage } = req.query || {};
    const data = await fetchRepositories(language, since, spokenLanguage);
    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(error(err));
  }  
}