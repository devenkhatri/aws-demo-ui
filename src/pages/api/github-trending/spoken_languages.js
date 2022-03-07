const spokenLanguages = require('./data/spoken-languages.json');
const { success } = require('./utils/response');

exports.handler = async () => success(spokenLanguages, { maxAge: 86400 });
