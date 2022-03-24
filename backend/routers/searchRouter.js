import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Search from '../models/searchModel.js';

const searchRouter = express.Router();


searchRouter.post(
  '/searchdata',
  expressAsyncHandler(async (req, res) => {
    const search = new Search({
      name: req.body.name,
    });
    const createdSearch = await search.save();
    res.send({
      _id: createdSearch._id,
      name: createdSearch.name,
    });
  })
);

searchRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const searches = await Search.find({});
    res.send(searches);
  })
);
export default searchRouter;
