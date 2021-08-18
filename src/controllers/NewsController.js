import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import { NewsService } from '../services/newsService';
const { User } = model;

let news;

export const NewsController = {

  async getNews(req, res) {
    try {
      const data = await NewsService.FetchNews();
      news = data;
      return res.render('news', { data });
    } catch (error) {
      return sendErrorResponse(res, 500, 'Error ocurred while fetching news');
    }
  },

  async viewNew(req, res) {
    try {
      const { title } = req.query;
      const detail = await news.articles.find(element => element.title == title);
      return res.render('readnews', { detail });
    } catch (error) {
      return sendErrorResponse(res, 500, 'Error ocurred while fetching news');
    }
  }
};
