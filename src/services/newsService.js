const rp = require('request-promise');
const dotEnv = require('dotenv');

const apiUrl = 'http://newsapi.org/v2/';
dotEnv.config();
const api_key = `${process.env.NEW_API_KEY}`
const options = {
    method: 'GET',
    uri: `${apiUrl}top-headlines`,
    qs: {
        country: 'ng',
        category: 'sports',
        apiKey: api_key
    },
    json: true,
  };
export const NewsService = {
  async FetchNews() {
      try {
        const data = await rp(options); 
        return data;
      } catch (error) {
          console.log(error);
      }
  }
}