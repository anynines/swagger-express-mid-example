// eslint-disable-next-line no-unused-vars
import mongo from 'mongodb';
import monk from 'monk';

const URL = 'mongo:27017/mockers';

const mongoDB = monk(URL);

const mongoDBRouter = (req, _res, next) => {
  req.db = mongoDB;
  next();
};

export default mongoDB;
export { mongoDBRouter };
