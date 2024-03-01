import {model, Schema, Types} from 'mongoose';
import User from './User';
import Post from './Post';

const CommentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) =>{
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    }
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) =>{
        const post = await Post.findById(value);
        return Boolean(post);
      },
      message: 'Post does not exist!',
    }
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comments = model('Comments', CommentsSchema);

export default Comments;