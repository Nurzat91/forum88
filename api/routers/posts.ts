import express from 'express';
import mongoose, {Types} from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import Post from '../models/Post';


const postRouter = express.Router();

postRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) =>{
  try {
    const user = (req as RequestWithUser).user;

    const postData = {
      user: user,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
      image: req.file ? req.file.filename : null,
    };

    const post = new Post(postData);
    await post.save();

    return res.send(post);
  }catch (e){
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

postRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Post.find().populate('user', 'username');

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

postRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }

    const post = await Post.findById({_id});

    if (!post) {
      return res.status(404).send({error: 'Not found!'});
    }

    res.send(post);
  } catch (e) {
    next(e);
  }
});

export default postRouter;