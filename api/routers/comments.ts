import express from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';
import Comments from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth,  async (req, res, next) =>{
  try {
    const user = (req as RequestWithUser).user;

    const commentsData = {
      userId: user,
      postId: req.body.postId,
      comment: req.body.comment,
    };

    const comments = new Comments(commentsData);
    await comments.save();

    return res.send(comments);
  }catch (e){
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

commentsRouter.get('/', async (req, res, next) => {
  try {
    const results = await Comments.find().populate('userId', 'username');

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

export default commentsRouter;